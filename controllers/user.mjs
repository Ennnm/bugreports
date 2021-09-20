import { getHash } from '../util.mjs';

export default function initUserController(db) {
  // const index = async (req, res) => {
  //   try {
  //     const bugs = await db.Bug.findAll(
  //       {
  //         include: {
  //           model: db.Feature,
  //         },
  //         order: [['createdAt', 'DESC']],
  //       },
  //     );
  //     // console.log('bugs :>> ', bugs);
  //     // console.log('bugs[0].feature.name :>> ', bugs[0].feature.name);
  //     res.send({ bugs });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const create = async (req, res) => {
    const user = req.body;
    console.log('user :>> ', user);
    const userId = await db.User.create({
      name: user.username,
      password: getHash(user.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((result) => result.id)
      .catch((error) => console.log('error in user register controller', error));
    console.log('userSeq :>> ', userId);

    // TODO where are the cookies?! response must be sent!
    res.cookie('loggedIn', getHash(userId));
    res.cookie('userId', userId);
    res.send({ userId });
  };

  const login = async (req, res) => {
    const user = req.body;
    try {
      const foundUser = await db.User.findOne({ where: { name: user.username } });
      if (foundUser !== null) {
        const doesPasswordMatch = getHash(user.password) === foundUser.password;
        if (doesPasswordMatch === true) {
          const userId = foundUser.id;
          res.cookie('loggedIn', getHash(userId));
          res.cookie('userId', userId);
          res.send({ userId });
        }
        else {
          throw Error('wrong password');
          // res.send({ err: 'Wrong password' });
        }
      }
      else {
        throw Error('wrong user');
        // res.send({ err: 'Wrong user' });
      } } catch (error) {
      console.log('error in login :>> ', error);
      res.send({ error });
    }
  };
  return {
    // index,
    create,
    login,
  };
}
