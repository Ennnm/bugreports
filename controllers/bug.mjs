export default function initBugsController(db) {
  const index = async (req, res) => {
    try {
      const bugs = await db.Bug.findAll(
        {
          include:
            [
              {
                model: db.Feature,
              },
              {
                model: db.User,
              },
            ],

          order: [['createdAt', 'DESC']],
        },
      );
      // console.log('bugs :>> ', bugs);
      // console.log('bugs[0].feature.name :>> ', bugs[0].feature.name);
      res.send({ bugs });
    } catch (error) {
      console.log(error);
    }
  };
  const create = (req, res) => {
    res.render('create');
  };
  const createForm = async (req, res) => {
    console.log('in create form');
    try {
      const bug = req.body;
      console.log('bug :>> ', bug);
      const featureName = bug.feature;
      const featureId = await db.Feature.findOne(
        {
          where:
          { name: featureName },
        },
      ).then((feature) => {
        if (feature === null) {
          return db.Feature.create({ name: featureName });
        }
        return feature;
      }).then((feature) => {
        console.log('featureId :>> ', feature.id);
        bug.featureId = feature.id;
        return db.Bug.create(bug);
      }).then((bug) => {
        console.log('bug :>> ', bug);
        console.log('bug creation a success');
        return (bug.id);
      })
        .catch((e) => console.error(e));
      console.log('featureId :>> ', featureId);
    }
    catch (error) {
      console.log('error :>> ', error);
    }
  };
  const features = async (req, res) => {
    try {
      const feat = await db.Feature.findAll();
      res.send({ feat });
    } catch (error) {
      console.log('error in getting features :>> ', error);
    }
  };
  return {
    index,
    create,
    createForm,
    features,
  };
}
