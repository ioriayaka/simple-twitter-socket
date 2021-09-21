  'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    account: DataTypes.STRING,
    cover: DataTypes.STRING,
    role: DataTypes.STRING,
    isAdmin: DataTypes.STRING,
    //加入 isNoticed 欄位
    isNoticed: DataTypes.BOOLEAN,
    //補加入 introduction 欄位
    introduction: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Reply)
    User.hasMany(models.Tweet)
    User.hasMany(models.Like)
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followingId',
      as: 'Followers'
    })
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
    // 加入關聯 - 阿金
    User.belongsToMany(models.Tweet, {
      through: models.Like,
      foreignKey: 'UserId',
      as: 'LikedTweet'
    })
  };
  return User;
};