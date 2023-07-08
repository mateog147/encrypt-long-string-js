const crypto = require("crypto");

//example RSA 2048 keys
//TODO!: Don't use hard coded keys this is only for example purpose
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAkB+EFEOlZahotxEEbT39aDOMXnRteBX49GnASXe+VuvkwZ9Y
ZiiUKzCXaUpPo8SqIhPwvLmevkESflmDBFSCE6aHQoYdVVHyCPKGwT7J8+QtKnub
9B57CHeTgE/qbe0UgDOBZtoMIDkZkn4UDJMMGNzI2M7BG3x5dFNzJwS8jaTh1r4O
SnetSorI/47vnR9i/TvPlZv6V6KImE/dvfV8BNvp2/IzBg1DFLT7shrRSqnJ+NtS
hqSjBcEX1Ph3MG9ml3US6ZP6+6FOwRXlV5r/TvBUcqBcfqzHarDlhjrZ1LHEdbLv
DQfuNnqVmQh3I2o5jLJwY3XLx63XSdVrmrRs5wIDAQABAoIBADUwDFRWKqH7prl4
xEN0jyJ3c6QgH44jvb6lkFsMn+gAImn6XmtFKnlN83LeA8oSeB8fcMaVUiowZZzP
d/SPI3oRCPXZ/NVR6pq2tlh2zZz+ZlS5TXKoFQuo5XyDAacTyW8OkwDcE4GI0REp
Ckkhs2Mxh8XLd6SnKUNu0J5jtxomXgEnKQcy8b+6+08mP08VO6Bw0CkMFBjvh5/8
KPeHY5LJMSOmlPzxhOKRvl4kohh4HhVt0pBfRPoz0xHZn6axILFI1qfHPeDNL/wf
dccuOLi2B4g3jXUnsv3O1osXbVNVv9MY/99WrIbuBZ4t8Stqt4dVrq732DuL5vTl
n340OcECgYEA/gLIAgluEXB3eWqCZvqrk9bggDdfJX5WzciHUoKDWaWwAz/Vxtrb
ssReo+F2PYClDftuHEWaVTjohOm16OVIvNhH9V6Y0GaJkj9Sv5oJLk/v0kkRCmee
jdYbFXclCmA6Gw29aixTVaHZ0iZys2Y+pDRdymiKfR+4nonED0PDdpECgYEAkUBw
+dU+b/CMqc3kpV5NgacPqnYCGIQoLjtN69+L1+AQJhD9UW/cgeWIGiEDEwwQejjJ
RvRd7e4dl+saveD1LQNYo9r7G0FgzepSvVkZqR/estPwmM8hnUr7QI2dPzh7xwi7
H7o2xG0kOAZPEO3MGZbEZpesCm8YhtXS3WkWF/cCgYBIVLZrjg/fu2zqECBN/rd5
A8kt+ZaIcK97Lc0K+8s3bezvH/BaDdxdzXk9pWgsH0Pg9WXnexJ1jhz4LCz2wsOx
ssza3DMbtPcbxBhmIxDWNUEPWmsV0Wfe78cKl8DecYRaS9FSOIkKa2pBY11qJIVV
8Ot8RcSZ2LyTuJsx1ZQFYQKBgAwTqJENKuDRxlBD/zPEsHsMMeBBaZEyQ8j8Q1FO
R+lOBumzVeyUeWgPdo59mizWPvR6jjmpDbo/pxQ/hvysnJX+hjsxdNliSTM1vWVi
6CBItxJ1TrbV2fyjBFrsq1tbTedRkYVkzTLtxCooVCCbNPIXuAKzr6k6bXaghqTE
HQMnAoGAaKz4XGrV+m9NduSX30RKezoze3/W1bx3ZIt0H+mT019aVBvsuv2x8wrt
s+XTBwDynQaCXfFyxCKBlnvPJmo2lMQoo+c32pbCjeYm9r/apmQogxXnJrgP6i2u
7v8P2SLG7I9p9aUmuzZeeV95PM9gep2jHkO7PL5MAoxYVOhMskg=
-----END RSA PRIVATE KEY-----
`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkB+EFEOlZahotxEEbT39
aDOMXnRteBX49GnASXe+VuvkwZ9YZiiUKzCXaUpPo8SqIhPwvLmevkESflmDBFSC
E6aHQoYdVVHyCPKGwT7J8+QtKnub9B57CHeTgE/qbe0UgDOBZtoMIDkZkn4UDJMM
GNzI2M7BG3x5dFNzJwS8jaTh1r4OSnetSorI/47vnR9i/TvPlZv6V6KImE/dvfV8
BNvp2/IzBg1DFLT7shrRSqnJ+NtShqSjBcEX1Ph3MG9ml3US6ZP6+6FOwRXlV5r/
TvBUcqBcfqzHarDlhjrZ1LHEdbLvDQfuNnqVmQh3I2o5jLJwY3XLx63XSdVrmrRs
5wIDAQAB
-----END PUBLIC KEY-----
`;

//Encrypt
const asymmetricEncryption = async (pin, key) => {
    const buffer = Buffer.from(pin);
    const encryptedPin = crypto.publicEncrypt(
        { key: key, padding: crypto.constants.RSA_PKCS1_PADDING },
        buffer
    );
    return encryptedPin.toString("base64");
};

const symemtricEncryption = async (str) => {
    //random key
    const key = crypto.randomBytes(16);
    //random  initialization vector
    const iv = crypto.randomBytes(16);

    //Encryption of the text using the randomly generated key and iv
    const myCipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let encodeStr = myCipher.update(str, "utf8", "hex");
    encodeStr += myCipher.final("hex");

    //then we return a JSON with the simtric encrypted text and the key and iv.
    // but key and iv are encrypted using the public key of the asymmetric algorithm.
    return JSON.stringify({
        key: await asymmetricEncryption(key.toString("base64"), publicKey),
        iv: await asymmetricEncryption(iv.toString("base64"), publicKey),
        text: encodeStr,
    });
};

//Decrypt
const asymmetricDecryption = async (pin, key) => {
    const buffer = Buffer.from(pin, "base64");
    const decryptedPin = crypto.privateDecrypt(
        { key: key, padding: crypto.constants.RSA_PKCS1_PADDING },
        buffer
    );
    return decryptedPin.toString("utf8");
};

const symetricDecodePassword = async (encodeString) => {
    const object = JSON.parse(encodeString);

    //key and iv decryption
    const key = await asymmetricDecryption(object.key, privateKey);
    const iv = await asymmetricDecryption(object.iv, privateKey);

    //text decryption
    const myDecrypter = crypto.createDecipheriv(
        "aes-128-cbc",
        Buffer.from(key, "base64"),
        Buffer.from(iv, "base64")
    );

    let decryptedMsg = myDecrypter.update(object.text, "hex", "utf8");

    decryptedMsg += myDecrypter.final("utf8");

    return decryptedMsg;
};

const bigString = "some very big text";

const execute = async () => {
    const encryptResult = await symemtricEncryption(bigString);
    console.log("encryptResult :>> ", encryptResult);

    const decryptResult = await symetricDecodePassword(encryptResult);
    console.log("decryptResult :>> ", decryptResult);
};

execute();
