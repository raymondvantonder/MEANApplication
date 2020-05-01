class ErrorBase extends Error {
    constructor(httpErrorCode, message) {
        super(message);

        this.httpErrorCode = httpErrorCode;
    }
}

class EntityAlreadyExists extends ErrorBase {
    constructor(entity, message) {
        super(400, message);

        this.entity = entity;
    }
}

class EntityNotFoundError extends ErrorBase {
    constructor(entity, message) {
        super(404, message);

        this.entity = entity;
    }
}

class InvalidPasswordError extends ErrorBase {
    constructor() {
        super(403, 'Invalid Password!');
    }
}

class UnknownError extends ErrorBase {
    constructor(message) {
        super(412, message);
    }
}

module.exports = {
    ErrorBase,
    EntityAlreadyExists,
    EntityNotFoundError,
    InvalidPasswordError,
    UnknownError,
};