import { hashPassword } from "./util.js";

export let users = [
  {
    id: "1",
    email: "a@a",
    password: "$2b$10$mxZbU8EKCmVslSN08BPg0.wsG1RV/1Dga8dAjGJzF4i/fMSKMw/VO", // aaa
    photo: "https://source.unsplash.com/random/72x72?sig=1",
    name: "Xanthe Neal",
    bio: "I am a software developer and a big fan of devchallenges...",
    phone: "908249274292",
  },
];

export function createUser(user) {
  const createdUser = {
    ...user,
    id: (users.length + 1).toString(),
  };
  users.push(createdUser);
  return createdUser;
}

/**
 *
 * @param {string} id
 */
export function removeUserById(id) {
  users = users.filter((u) => u.id !== id);
}

export async function updateUser(userId, fieldsToUpdate) {
  console.log("updateUser:userId", userId, "fieldsToUpdate", fieldsToUpdate);
  let user = findUserById(userId);
  if (!user) return;
  removeUserById(userId);
  for (const key in user) {
    if (fieldsToUpdate[key]) {
      if (key === "password") {
        user[key] = await hashPassword(fieldsToUpdate[key]);
      } else {
        user[key] = fieldsToUpdate[key];
      }
    }
  }
  createUser(user);
  return user;
}

/**
 *
 * @param {string} id
 */
export function findUserById(id) {
  const user = users.find((u) => u.id === id);
  return user;
}

/**
 *
 * @param {string} email
 */
export function findUserByEmail(email) {
  const user = users.find((u) => u.email === email);
  return user;
}
