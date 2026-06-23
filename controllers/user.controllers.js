const User = require("../models/user");
const Post = require("../models/post");
const cache = require("../config/redisClient");

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

const getUserByNickName = async (req, res) => {
  try {
    const { nickName } = req.params;
    const cacheKey = `user:${nickName}`;

    if (cache.isReady) {
      const cachedProfile = await cache.get(cacheKey);
      if (cachedProfile) {
        return res.status(200).json(JSON.parse(cachedProfile));
      }
    }

    const profile = await User.findOne({ nickName })
      .populate("followers", "nickName firstName lastName")
      .populate("following", "nickName firstName lastName")
      .select("-__v");

    if (!profile)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (cache.isReady) {
      await cache.set(cacheKey, JSON.stringify(profile), { EX: 300 });
    }

    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el perfil", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nickName } = req.params;
    const updatedUser = await User.findOneAndUpdate({ nickName }, req.body, {
      new: true,
      runValidators: true,
    });

    if (cache.isReady) {
      await cache.del(`user:${nickName}`);
      await cache.del("posts:all");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el usuario",
        error: error.message,
      });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { nickName } = req.params;
    const foundUser = req.foundUser;

    const userPosts = await Post.find({ author: foundUser._id }).select("_id");

    await Post.deleteMany({ author: foundUser._id });

    await Post.updateMany(
      {},
      { $pull: { comments: { author: foundUser._id } } },
    );

    await User.findByIdAndDelete(foundUser._id);

    if (cache.isReady) {
      await cache.del(`user:${nickName}`);
      await cache.del("posts:all");
      for (const post of userPosts) {
        await cache.del(`post:${post._id}`);
      }
    }
    res
      .status(200)
      .json({ message: "Usuario y todo su contenido asociado eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { followerNick, targetNick } = req.body;
    if (followerNick === targetNick) {
      return res.status(400).json({ error: "No podes seguirte a vos mismo" });
    }

    const follower = await User.findOne({ nickName: followerNick });
    const target = await User.findOne({ nickName: targetNick });

    if (!follower || !target) {
      return res
        .status(404)
        .json({ error: "El usuario seguidor o el objetivo no existen" });
    }

    await User.findByIdAndUpdate(follower._id, {
      $addToSet: { following: target._id },
    });
    await User.findByIdAndUpdate(target._id, {
      $addToSet: { followers: follower._id },
    });

    if (cache.isReady) {
      await cache.del(`user:${followerNick}`);
      await cache.del(`user:${targetNick}`);
    }

    return res.status(200).json({
      message: `Felicitaciones!!! @${followerNick} ahora seguis a @${targetNick}`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al procesar el seguimiento",
        error: error.message,
      });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByNickName,
  updateUser,
  deleteUser,
  followUser,
};
