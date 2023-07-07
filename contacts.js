import { nanoid } from "nanoid";
import path from "path";

import fs from "fs/promises";

const filePath = path.resolve("./db/contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(filePath);
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...data };
    contacts.push(newContact);
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};
