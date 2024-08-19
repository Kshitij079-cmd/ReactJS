// const express = require('express');
import dns from "node:dns"
import emailValidator from "deep-email-validator";
const checkDomainMXRecords = (domain) => {
    return new Promise((resolve, reject) => {
      dns.resolveMx(domain, (err, addresses) => {
        if (err) return reject(err);
        resolve(addresses.length > 0);
      });
    });
  };
    export default checkDomainMXRecords

//     const emailValidator = require('deep-email-validator');

// async function isEmailValid(email) {
// return emailValidator.validate(email)
// }