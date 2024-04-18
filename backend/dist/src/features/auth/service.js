"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const utils_1 = require("../../utils");
class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(email, password) {
        if (await this.userRepository.findByEmail(email)) {
            return null;
        }
        const hashedPassword = await (0, utils_1.hashPassword)(password);
        const createdUser = await this.userRepository.create({
            email,
            password: hashedPassword,
            provider: "local",
        });
        return (0, utils_1.generateToken)(createdUser.id);
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmailWithPassword(email);
        if (!user || typeof user.password === "undefined") {
            return null;
        }
        if (!(await (0, utils_1.verifyPassword)(password, user.password))) {
            return null;
        }
        return (0, utils_1.generateToken)(user.id);
    }
    async loginWithService(code, oauthProvider) {
        const accessToken = await oauthProvider.getAccessToken(code);
        const { name, email, avatar_url: photo, bio, } = await oauthProvider.getUserInfo(accessToken);
        // Create new user if it doesn't already exist
        let user = await this.userRepository.findByEmail(email);
        if (!user) {
            user = await this.userRepository.create({
                email,
                provider: "github",
                name,
                photo,
                bio,
            });
            console.info(`GitHub Oauth: Created new user`);
        }
        return (0, utils_1.generateToken)(user.id);
    }
}
exports.AuthService = AuthService;
