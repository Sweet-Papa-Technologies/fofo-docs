# Get Current Directory
dir=$(pwd)

# CD into the directory of the script
cd "$(dirname "$0")"

# Kill existing container
docker ps -a | grep fofo-chroma-db | awk '{print $1}' | xargs docker stop || true

# Build the Docker Image
docker run -p 8000:8000 fofo-chroma-db &

# CD back to the original directory
cd $dir