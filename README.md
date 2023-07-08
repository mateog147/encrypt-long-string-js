## Usage/Examples

- RSA asymmetric encryption algorithms are ideal for many use cases due to their level of security, however they are limited by the size of the text they can encrypt, which will depend on the size in bytes of the encryption key.
- On the other hand, the symmetric AES algorithms do not have a limitation on the size of the text to be encrypted, however, they may not be ideal in many use cases, since encryption keys are shared between both ends of the communication.
- In this exercise what I propose is a use of both encryption techniques, initially the text is encrypted with a symmetric algorithm using randomly generated encryption keys at runtime, after this, the randomly generated keys are encrypted using the public key in an asymmetric algorithm, then everything is joined in a JSON that can be sent to the backend, the backend is the only one capable of decrypting the message using the private key.

## Run locally

```
node encrypt-large-string.js
```


## Authors

- [@mateog147](https://github.com/mateog147)