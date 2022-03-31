module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Model attributes are defined here
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    }, {
      timestamps: false,
    });
    User.associate = (models) => {
      User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'posts' });
    };
  return User;
};
