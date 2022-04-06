//Get Firebase authentication object from firebase initializer
import { auth, firestore, db } from "../server/init-firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
//Get firebase functions
import { createUserWithEmailAndPassword , onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import User from "./../../objects/user";
import CreditCard from "./../../objects/credit-card";
import Address from "./../../objects/address"

const userConverter = {
    toFirestore: (user) => {
        return {
            name: user.name,
            username: user.username,
            email: user.email,
            creditCards: user.creditCards.map(creditCard => {
                return {
                    name: creditCard.name,
                    number: creditCard.number,
                    CVV: creditCard.CVV,
                    expiration: creditCard.expiration,
                    zipCode: creditCard.zipCode
                }
            }),
            listedItems: [],
            address: {
                street: user.address.street,
                town: user.address.town,
                apartment: user.address.apartment,
                houseNumber: user.address.houseNumber,
                state: user.address.state,
                country: user.address.country
            },
            wishList: [],
            purchasedItems: []
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(
            data.name,
            data.username,
            data.email,
            data.creditCards.map(creditCard => {
                return new CreditCard(
                    creditCard.name,
                    creditCard.number,
                    creditCard.CVV,
                    creditCard.expiration,
                    creditCard.zipCode
                );
            }),
            data.listedItems,
            new Address(
                data.address.street,
                data.address.town,
                data.address.apartment,
                data.address.houseNumber,
                data.address.state,
                data.address.country
            ),
            data.cart,
            data.wishList,
            data.purchasedItems    
        );
    }
}

/**
 * Creates the user account using email and password. Only called when a new account is made
 * Returns promise as a string. Empty if no error. 
 * @param {email} 
 * @param {password}
 * @returns {Promimse<string>} String
 */ 

const createUser = (name, username, email, password) => {
    return new Promise((resolve, reject) =>{
        createUserWithEmailAndPassword (auth, email, password).then(async (userCredential) => {
            //Signed in
            const user = userCredential.user;
            const uID = user.uid;
            //TODO: create new user in firestore with specific UID
            const userRef = doc(db, "users", uID).withConverter(userConverter);
            await setDoc(userRef, new User(name, username, email, [], [], new Address("", "", 0, 0, "", ""), [], [], []))
            resolve("");
        }).catch((error) => {
            //TODO: display error to user
            reject(error.message);
        })
    })
}
/**
 * Gets the current user signed in. If no user is signed in, returns null.
 * @returns {Promimse<string>} User?
 */
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                //TODO: Get user data from firestore and create user object
                const userRef = doc(db, "users", user.uid).withConverter(userConverter);
                const doc = await getDoc(userRef)
                if (doc.exists) {
                    let user = doc.data();
                    resolve(user);
                } else {
                    reject(new Error('User does not exist!'));
                }
                
            } else {
                reject(new Error('User not signed in!'));
            }
        })
    })
}
/**
 * Grabs the firebase ID for the current user
 * @returns {Promimse<string>} String
 */

const getUserID = () => {
    new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                resolve(user.uid);
            }else {
                reject("No user signed in");
            }
        })
    })
}

/**
 * Signs user in with entered email and password
 * @param {email}
 * @param {password}
 * @returns {Promimse<string>} String
 */
function signIn(email, password){
    return new Promise((resolve, reject) =>{
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            //Signed in
            const user = userCredential.user;
            window.location = "http://localhost:3000/home";
            resolve("");
        }).catch((error) => {
            const errorMessage = error.message;
            reject(errorMessage);
        })
    })
}

export {signIn, createUser, getCurrentUser, getUserID};