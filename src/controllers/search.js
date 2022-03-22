import Group from "../models/group.js";
import GroupControllers from "./group.js";
import User from "../models/user.js";
import UserControllers from "./user.js";
import StreamingControllers from "./streaming.js";

class SearchControllers {
  static async pesquisar(req, res) {
    try {
      const { search } = req.query;

      if(!search){
        res.status(400).json({error: "Search is empty"})
      }

      const groups = await Group.find({
        name: { $regex: search, $options: "i" },
      });
      const users = await User.find({
        name: { $regex: search, $options: "i" },
      });

      await Promise.all(
        groups.map(async (group) => {
          group = await GroupControllers.filterGroupsData(group);
        })
      );

      await Promise.all(
        users.map(async (user) => {
          user = await StreamingControllers.getUserStreaming(user);

          user.already_member = await UserControllers.getUserGroups(user._id);
        })
      );

      res.status(200).json({ groups, users });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default SearchControllers;
