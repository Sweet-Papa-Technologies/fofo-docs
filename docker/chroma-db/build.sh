# Get Current Directory
dir=$(pwd)

# CD into the directory of the script
cd "$(dirname "$0")"

# Read the .env file
export $(cat .env | xargs)

# If any of the variables we need are not set, exit
if [ -z "$API_PASS" ] || [ -z "$API_USER" ]; then
    echo "API_PASS and API_USER must be set in the .env file"
    exit 1
fi

# Build the Docker Image
docker build --build-arg API_PASS_ARG="$API_PASS" --build-arg API_USER_ARG="$API_USER" -t fofo-chroma-db  .

# CD back to the original directory
cd $dir