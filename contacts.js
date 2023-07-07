import { nanoid } from "nanoid";
import path from "path";

import fs from "fs/promises";

const filePath = path.resolve("./db/contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(filePath);
  console.log(data);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }

  return result;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  return result;
};

export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  return newContact;
};
