const axios = require('axios');

export const link = (str="/") => {
    return {
        type: "link",
        payload: str
    }
}