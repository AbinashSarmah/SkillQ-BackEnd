export const toQuizDTO = (quiz) => ({
  id: quiz._id.toString(),
  title: quiz.title,
  description: quiz.description,
  category: quiz.category,
  difficulty: quiz.difficulty,
  questions: quiz.questions,
  creatorId: quiz.creatorId,
  author: quiz.author,
  likes: quiz.likes,
  plays: quiz.plays,
  rating: quiz.rating,
  tags: quiz.tags,
  createdAt: quiz.createdAt,
});

export const toCategoryDTO = (category) => ({
  id: category.key,
  name: category.name,
  description: category.description,
  icon: category.icon,
});

export const toUserDTO = (user) => ({
  id: user._id.toString(),
  username: user.username,
  avatar: user.avatar,
  stats: user.stats,
  inventory: user.inventory,
  friends: user.friends,
  followers: user.followers,
  following: user.following,
});
