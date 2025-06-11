#!/bin/bash --login
# Zentric Digital Simplified Setup Script for Docker Environment

echo "===== Setting up Zentric Digital project in Docker ====="

# Define color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# The Docker image comes with nvm. We need to source it.
# The entrypoint script for the docker image should have already handled this,
# but we'll put in a check just in case.
if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
elif [ -s "$HOME/.nvm/nvm.sh" ]; then
    . "$HOME/.nvm/nvm.sh"
else
    echo -e "${YELLOW}nvm.sh script not found. Trying to continue without it...${NC}"
fi


# 1. Set up Node.js version
NODE_VERSION="20"
echo -e "${YELLOW}Switching to Node.js v${NODE_VERSION} using nvm...${NC}"
if command -v nvm &> /dev/null; then
    nvm use ${NODE_VERSION} > /dev/null 2>&1 || (nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION})
    echo -e "${GREEN}Using Node.js $(node -v).${NC}"
else
    echo -e "${YELLOW}nvm command not found. The script assumes Node.js v${NODE_VERSION} is available in PATH.${NC}"
fi

# 2. Install dependencies
echo -e "${YELLOW}Installing dependencies using npm...${NC}"
npm install

# 3. Build Next.js application
echo -e "${YELLOW}Building Next.js application...${NC}"
NODE_OPTIONS=--max_old_space_size=4096 npx next build

# 4. Create helper scripts
echo -e "${YELLOW}Creating helper scripts...${NC}"

# Create dev.sh script
cat > dev.sh << 'EOF'
#!/bin/bash --login
echo "Starting Next.js development server..."

# Source nvm and use correct node version
if [ -s "$NVM_DIR/nvm.sh" ]; then . "$NVM_DIR/nvm.sh"; fi
nvm use 20 >/dev/null 2>&1

export NODE_OPTIONS=--max_old_space_size=4096
npx next dev "$@"
EOF
chmod +x dev.sh

# Create start.sh script
cat > start.sh << 'EOF'
#!/bin/bash --login
echo "Starting Next.js production server..."

# Source nvm and use correct node version
if [ -s "$NVM_DIR/nvm.sh" ]; then . "$NVM_DIR/nvm.sh"; fi
nvm use 20 >/dev/null 2>&1

export NODE_OPTIONS=--max_old_space_size=4096
npx next start "$@"
EOF
chmod +x start.sh

# Create offline.sh script for switching to offline mode
cat > offline.sh << 'EOF'
#!/bin/bash
echo "Configuring npm for offline use..."
npm config set offline true
echo "Project is now configured for offline use."
EOF
chmod +x offline.sh

echo -e "${GREEN}Setup complete! The project is ready for use.${NC}"
echo ""
echo "To run the development server: ./dev.sh"
echo "To run the production server: ./start.sh"
echo ""
echo "To switch to offline mode after initial setup: ./offline.sh"
echo ""
echo "Note: If you encounter any memory issues during build or startup,"
echo "edit the scripts to increase the max_old_space_size value." 