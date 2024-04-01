import { auctioneerService } from '../services/auctioneer.js';
import CustomError from '../helpers/custom-error.js';
import { request } from 'express';

// Controller function to create a new auctioneer
export const createAuctioneer = async (req, res, next) => {
  try {
    const { _id: admin } = req.user;
    req.body.admin = admin;

    await auctioneerService.createAuctioneer(req.body);
    res.status(201).json({ message: 'Auctioneer created successfully' });
  } catch (error) {
    if (error.message.includes('E11000')) {
      next(new CustomError('Auctioneer already exists', 400));
    } else {
      next(error);
    }
  }
};

// Controller function to get details of a specific auctioneer
export const getAuctioneerById = async (req, res, next) => {
  try {
    const auctioneer = await auctioneerService.getAuctioneerById(req.params.id);
    if (!auctioneer) {
      throw new CustomError('Auctioneer not found', 404);
    }
    res.json(auctioneer);
  } catch (error) {
    next(error);
  }
};

// Controller function to get all auctioneers
export const getAllAuctioneers = async (req, res, next) => {
  try {
    const admin = req.user._id;
    const auctioneers = await auctioneerService.getAuctioneerByUserId(admin);
    res.json(auctioneers);
  } catch (error) {
    next(error);
  }
};

// Controller function to update an existing auctioneer
export const updateAuctioneer = async (req, res, next) => {
  try {
    await auctioneerService.updateAuctioneer(req.params.id, req.body);
    res.json({ message: 'Auctioneer updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Controller function to delete an auctioneer
export const deleteAuctioneer = async (req, res, next) => {
  try {
    await auctioneerService.deleteAuctioneer(req.params.id);
    res.json({ message: 'Auctioneer deleted successfully' });
  } catch (error) {
    next(error);
  }
};
