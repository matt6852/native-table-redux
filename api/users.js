let users = [
 {
  id: 1,
  login: 'john_doe',
  email: 'john.doe@example.com',
  country: 'USA',
  sex: 'Male',
  age: 30
 },
 {
  id: 2,
  login: 'jane_smith',
  email: 'jane.smith@example.com',
  country: 'Canada',
  sex: 'Female',
  age: 25
 },
];

export const getUsers = () => {
 return new Promise((resolve) => {
  setTimeout(() => {
   resolve(users);
  }, 500);
 });
};

export const addUserAPI = (user) => {
 return new Promise((resolve) => {
  setTimeout(() => {
   const newUser = { ...user, id: Date.now() };
   users = [...users, newUser]
   resolve(newUser);
  }, 500);
 });
};
export const updateUserAPI = (user) => {
 return new Promise((resolve) => {
  setTimeout(() => {
   const index = users.findIndex((u) => u.id === user.id);
   if (index !== -1) {
    users = users.map((u) => u.id === user.id ? { ...user } : u)
    resolve(user);
   } else {
    resolve(null);
   }
  }, 500);
 });
};

export const deleteUser = (userId) => {
 return new Promise((resolve) => {
  setTimeout(() => {
   const index = users.findIndex((u) => u.id === userId);
   if (index !== -1) {
    const deletedUser = users.slice().splice(index, 1)[0];
    users = users.filter((u) => u.id !== userId)
    resolve(deletedUser);
   } else {
    resolve(null);
   }
  }, 500);
 });
};
