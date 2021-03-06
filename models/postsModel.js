const blogPostDataTypes = (DataTypes) => ({
  title: DataTypes.STRING,
  content: DataTypes.STRING,
});

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', 
    blogPostDataTypes(DataTypes),
    {
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts',
    });
    
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  return BlogPost;
};
