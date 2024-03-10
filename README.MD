# DAZN MOVIE LOBBY BACKEND ASSESSMENT

## Setup Instructions

1. Create a `config` folder at the root of the project.

    ```bash
    ./config
    ```

2. Create `dev.env` and `prod.env` files inside the `./config` folder.

3. Add the environment values to the respective `.env` files.

    ```bash
    MONGO_URL=Your MONGODB connection string
    PORT=Your Port number
    JWT_SALT=Your JWT Secret Code
    ```

4. Install the dependencies:

    ```bash
    $ npm install
    ```

5. Running the Project:

    ```bash
    # Run with development Credentials
    $ npm run dev

    # Run with production Credentials
    $ npm run prod
    ```
