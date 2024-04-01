import bidService from "../services/bid.js";

const bidController = {
  createBid,
  getAll,
  getById,
  update,
  closeBid,
  _delete,
};

async function createBid(req, res, next) {
  try {
    req.body.userId = req.user._id;
    req.body.createdAt = new Date();
    const bid = await bidService.createBid(req.body);

    // Emit a WebSocket event when a new bid is created
    // req.io.getIO().emit("bids", { action: "create", bid: bid });

    res.json(bid);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const bids = await bidService.getBids();
    res.json(bids);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const bid = await bidService.getBid(req.params.id);
    res.json(bid);
  } catch (error) {
    next(error);
  }
}

async function closeBid(req, res, next) {
  console.log("We are here ;;;;;", req.params.bidId, req.params.auctionId)
  try {
    const bid = await bidService.closeBid(req.params.bidId, req.params.auctionId);
    res.json(bid);
  } catch (error) {
    next(error);
  }

}

async function update(req, res, next) {
  try {
    await bidService.updateBid(req.params.id, req.body);
    res.json({ message: "Bid updated successfully" });
  } catch (error) {
    next(error);
  }
}



async function _delete(req, res, next) {
  try {
    await bidService._delete(req.params.id);
    res.json({ message: "Bid deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export default bidController;
