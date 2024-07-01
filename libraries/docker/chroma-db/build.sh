# Get Current Directory
dir=$(pwd)

# CD into the directory of the script
cd "$(dirname "$0")"

# Read the .env file, if it exists
[ -f .env ] && source .env

# Build the Docker Image
docker build -t fofo-chroma-db  .

# CD back to the original directory
cd $dir