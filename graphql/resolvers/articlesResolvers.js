const Article = require("../../models/articles.model");
const User = require("../../models/user.model");
const articleResolvers = {
    Query: {
        getAllArticle: async () => {
            const articles = await Article.find();
            console.log(articles);
            return articles;
        },
        getOneArticle: async (_, args) => {
            const { id } = args;
            const articles = await Article.findById({ _id: id });
            return articles;
        },
        getMyArticle: async (_, args) => {
            const { id } = args;
            const articles = await Article.find({ authorId: id });
            return articles;
        }
    },
    Mutation: {
        makeArticle: async (_, args) => {
            const articles = new Article(args.article);
            await articles.save();
            return articles;
        },
        updateArticle: async (_, args) => {
            const { id, data } = args;
            console.log(data)
            await Article.findByIdAndUpdate({ _id: id }, { $set: data });
            return "updated successfully"
        },
        deleteMyOneArticle: async (_, args) => {
            const { id } = args;
            await Article.deleteOne({ _id: id });
            return "deleted successfully"
        },
        deleteMyAccount: async (_, args) => {
            const { id } = args;
            await User.deleteOne({ _id: id });
            await Article.deleteMany({ authorId: id });
            return "deleted successfully"
        },

    }
};

module.exports = articleResolvers;