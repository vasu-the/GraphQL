const User = require("../../models/user.model");
const Article = require("../../models/articles.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-express");

const resolvers = {
    Query: {
        authUser: async (_, args) => {
            try {
                const { email, password } = args.loginDetails;
                const checkUser = await User.findOne({ email: email })
                // Check User
                if (checkUser === null) {
                    return "User not Exits"
                }
                // Verify Password
                const verifyPassword = await bcrypt.compare(password, checkUser.password) === true;
                console.log(verifyPassword);
                if (!verifyPassword) {
                    return "Invalid Password"
                }
                //Token generation 
                const auth = { data: checkUser._id.valueOf() }
                console.log("profilee", auth)
                const token = jwt.sign(auth, "secretkey", { expiresIn: '1d' });
                const tokenData = await jwt.verify(token, "secretkey")
                console.log("ffggg", token, "token", tokenData)
                return token;

            } catch (err) {
                console.log(err)
                return "Something is Wrong"
            }
        },
        profile: async (_, args) => {
            // try{
            // const profile = await User.findById({_id:user.data.toString()});
            // const articles = await Article.find({authorId:user.data.toString()})
            // const final = {...profile._doc,articles}
            // return final;
            // }catch(err){
            //     return "Something went Wrong | Please Login Again "
            // }
            const { id } = args;
            const profile = await User.findById(id);
            if (!profile) {
                throw new Error("Profile not found");
              }
              return profile;
           },

        // dashboard: async (_, args) => {
        //     const { token } = args;
        //     const validateToken = await jwt.verify(token, "secretkey");
        //     return `Data : ${validateToken.email}`
        // },
         dashboard: async (_, args, context) => {
            try {
                const { req, res } = context;
                const tokenHeader = req?.headers?.authorization;
                const tokensplit = tokenHeader.split(" ");
                const token = tokensplit?.[1];
                const user = await jwt.verify(token, 'secretkey')
              
                const ProfileDetails = await User.findById({ _id: user.data.toString() });
                const articles = await Article.find({ authourId: user.data.toString() })
                const final = { ...ProfileDetails._doc, articles }
                return final;
            } catch (err) {
                return "Something went Wrong | Please Login Again "
            }
        }
    },
    Mutation: {
        async registerUser(_, { registerInput: { email, password } }) {
            //See if an old User exists with email attempting to register
            const oldUser = await User.findOne({ email });
            if (oldUser) {
                throw new ApolloError('Email Already Exists')
            }
            //Encrypt Password
            const encryptedPassword = await bcrypt.hash(password, 10);
            //Build out mongoose model(User)
            const newUser = new User({
                email, password: encryptedPassword
            });
            const res = await newUser.save();
            return {
                id: res.id,
                ...res._doc
            }
        }
    }
}

module.exports = resolvers;