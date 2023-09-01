import { writable } from 'svelte/store';
import { get } from 'svelte/store';

import { supabase } from './supabaseClient';
import bcryptjs from 'bcryptjs';

import { DB } from './classes/db';
import { Auth } from './classes/user/auth';
import { Parse } from './classes/parse';

const dbObj = new DB(supabase);
const authObj = new Auth(new Parse(), bcryptjs, supabase);

export const db = writable(dbObj);
export const auth = writable(authObj);
