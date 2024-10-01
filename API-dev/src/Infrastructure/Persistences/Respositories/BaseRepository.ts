import { FilterQuery, UpdateQuery, UpdateWriteOpResult } from 'mongoose';

import {
  Collection,
  Db,
  ObjectId,
  InsertOneResult,
  InsertManyResult,
  DeleteResult,
  OptionalUnlessRequiredId,
  FilterOperations,
  Document,
} from 'mongodb';
const {MongoClient} = require("mongodb");
require('dotenv').config();
const URI = process.env.CONNECTION_STRING;
const dbName = "NoahQuizDB";

import { User } from "../../../Domain/Entities/UserEntites";
import IBaseRepository from "../../../Application/Persistences/IRepositories/IBaseRepository";
import { SessionLogin } from "../../../Domain/Entities/SessionEntites";

abstract class BaseRepository<T extends Document> implements IBaseRepository {
 
  private collectionName: string;
  constructor(collectionName: string){
    this.collectionName = collectionName;
  }
  async connectDB() {
    try {
      const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log("Connected successfully to database !");
      return client.db(dbName);
    } catch (error: any) {
      throw new Error(error.message);
    }
}

async insertDocuments<T>(data: T): Promise<InsertOneResult<T>> {
    try {
      const db = await this.connectDB();
      const collectionName = this.collectionName;
      const collection = db.collection(collectionName);
      const result = await collection.insertOne(data);
      console.log("Inserted documents into the colleciotn");
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findDocuments<T>(
    query: Object,
    projectionOptions: object | null,
    sortOptions: {},
    page: number = 1,
    limit: number = 10000
  ): Promise<T[]> {
    try {
      if (page === 0) page = 1;
      const skip = (page - 1) * limit;
      const projection = projectionOptions
        ? { projection: projectionOptions }
        : {};
      const db = await this.connectDB();
      const collection = db.collection(this.collectionName);
      const docs = await collection
        .find(query , { ...projection })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray();
      console.log("docs found: " + docs);
      return docs as T[];
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async updateDocument<T>(
    query: Object,
    update: T
  ): Promise<UpdateWriteOpResult> {
    try {
      const db = await this.connectDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.updateOne(query, {$set: update});
      console.log("Updated result: " + result);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteDocument<T>(query: Object): Promise<DeleteResult> {
    try {
      const db = await this.connectDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.deleteOne(query);
      console.log("Delete documents: " + result);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default BaseRepository;
