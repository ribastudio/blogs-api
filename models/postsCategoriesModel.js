module.exports = (sequelize, _Datatypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {}, 
    { 
      timestamps: false,
      tableName: 'PostsCategories',
    });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId', otherKey: 'postId', as: 'posts', through: PostCategory,
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId', otherKey: 'categoryId', as: 'categories', through: PostCategory,
    });
  };

  return PostCategory;
};