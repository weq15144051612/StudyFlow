"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(props) {
        this.id = props.id || (0, uuid_1.v4)();
        this.name = props.name;
        this.email = props.email;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }
    updateName(newName) {
        this.name = newName;
        this.updatedAt = new Date();
    }
    updateEmail(newEmail) {
        this.email = newEmail;
        this.updatedAt = new Date();
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map