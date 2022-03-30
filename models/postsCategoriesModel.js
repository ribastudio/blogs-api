module.exports = (sequelize, _Datatypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, {
    timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {

  };

  return PostCategory;
};