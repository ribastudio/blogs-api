module.exports = (sequelize, _Datatypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {}, 
    { 
      timestamps: false,
      tableName: 'PostsCategories',
    });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'userId',
      otherKey: '',
      as: '',
      through: PostCategory,
    });
  };

  return PostCategory;
};