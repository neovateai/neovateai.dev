#!/usr/bin/env bash

set -e

# Color definitions
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

# Fancy header
echo ""
echo "${BOLD}Neovate Code Installer${NC}"
echo ""

# Function to print steps with style
print_step() {
    echo "${BLUE}▸${NC} ${1}"
}

# Function to print success
print_success() {
    # Move cursor up one line and clear it
    echo -ne "\033[1A\033[2K"
    echo "${GREEN}✓${NC} ${1}"
}

# Function to print error
print_error() {
    echo "${RED}✗${NC} ${1}"
}

# Function to print info
print_info() {
    echo "${CYAN}ℹ️${NC} ${1}"
}

# Function to print warning
print_warning() {
    echo "${YELLOW}⚠️${NC} ${1}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Detect OS and Architecture
print_step "Detecting system architecture..."

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     OS="linux";;
    Darwin*)    OS="darwin";;
    *)
        print_error "Unsupported operating system: ${OS}"
        exit 1
        ;;
esac

# Detect Architecture
ARCH="$(uname -m)"
case "${ARCH}" in
    x86_64|amd64)  ARCH="x64";;
    arm64|aarch64) ARCH="arm64";;
    *)
        print_error "Unsupported architecture: ${ARCH}"
        exit 1
        ;;
esac

print_success "Detected ${OS}/${ARCH}"

# Check Node.js version
check_node_version() {
    if ! command_exists node; then
        return 1
    fi
    
    local current_version=$(node -v | sed 's/v//')
    local major_version=$(echo $current_version | cut -d. -f1)
    
    if [ "$major_version" -ge 18 ]; then
        print_success "Node.js v$current_version is installed (>= 18)"
        return 0
    else
        print_error "Node.js v$current_version is installed but version < 18 (minimum required: 18)"
        print_error "Please upgrade Node.js to version 18 or higher"
        exit 1
    fi
}

# Download and install nvm
install_nvm() {
    local NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    local NVM_VERSION="v0.40.3"
    local DOWNLOAD_URL="https://neovateai.dev/nvm-${NVM_VERSION}.tar.gz"
    local TEMP_FILE="/tmp/nvm-${NVM_VERSION}.tar.gz"
    local TEMP_DIR="/tmp/nvm-offline-${NVM_VERSION}"
    
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        print_info "nvm is already installed at $NVM_DIR"
        return 0
    fi
    
    print_step "Downloading nvm ${NVM_VERSION}..."
    echo "${DIM}  Download URL: ${DOWNLOAD_URL}${NC}"
    
    # Download nvm package
    if curl -fSL --progress-bar "${DOWNLOAD_URL}" -o "${TEMP_FILE}"; then
        print_success "nvm package downloaded"
    else
        print_error "Failed to download nvm package"
        exit 1
    fi
    
    print_step "Extracting nvm package..."
    mkdir -p "${TEMP_DIR}"
    
    if tar -xzf "${TEMP_FILE}" -C "${TEMP_DIR}"; then
        print_success "nvm package extracted"
    else
        print_error "Failed to extract nvm package"
        rm -f "${TEMP_FILE}"
        exit 1
    fi
    
    print_step "Installing nvm..."
    mkdir -p "${NVM_DIR}"
    
    if cp "${TEMP_DIR}/"{nvm.sh,nvm-exec,bash_completion} "${NVM_DIR}/"; then
        chmod +x "${NVM_DIR}/nvm-exec"
        print_success "nvm installed to ${NVM_DIR}"
    else
        print_error "Failed to install nvm"
        rm -f "${TEMP_FILE}"
        rm -rf "${TEMP_DIR}"
        exit 1
    fi
    
    # Clean up
    rm -f "${TEMP_FILE}"
    rm -rf "${TEMP_DIR}"
    
    # Add nvm to shell profile
    local CURRENT_SHELL="$(basename $SHELL)"
    local PROFILE_FILE=""
    
    case "${CURRENT_SHELL}" in
        bash) PROFILE_FILE="$HOME/.bashrc" ;;
        zsh) PROFILE_FILE="$HOME/.zshrc" ;;
        *) PROFILE_FILE="$HOME/.profile" ;;
    esac
    
    local SOURCE_STR='
export NVM_DIR="'${NVM_DIR}'"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"'
    
    if ! grep -q 'NVM_DIR' "${PROFILE_FILE}" 2>/dev/null; then
        echo "${SOURCE_STR}" >> "${PROFILE_FILE}"
        print_info "Added nvm to ${PROFILE_FILE}"
    fi
}

# Install Node.js with nvm
install_nodejs_with_nvm() {
    local NODE_VERSION="22"
    local NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    
    # Load nvm
    export NVM_DIR="${NVM_DIR}"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    if ! command_exists nvm; then
        print_error "nvm not loaded properly"
        exit 1
    fi
    
    print_step "Installing Node.js v${NODE_VERSION}..."
    
    if nvm install ${NODE_VERSION}; then
        nvm alias default ${NODE_VERSION}
        nvm use default
        print_success "Node.js v${NODE_VERSION} installed successfully"
        
        # Verify installation
        print_info "Node.js version: $(node -v)"
        print_info "npm version: $(npm -v)"
        
        return 0
    else
        print_error "Failed to install Node.js"
        exit 1
    fi
}

# Check and install Node.js
check_and_install_nodejs() {
    print_step "Checking Node.js installation..."
    
    if check_node_version; then
        print_info "Using existing Node.js installation"
        return 0
    fi
    
    if ! command_exists node; then
        print_info "Node.js not found, installing via nvm..."
        
        # Install nvm
        install_nvm
        
        # Install Node.js
        install_nodejs_with_nvm
    fi
}

# Check existing Neovate installation
check_existing_neovate() {
    local neovate_path=$(which neovate 2>/dev/null)
    if [ -n "$neovate_path" ]; then
        # local current_version=$(neovate -v 2>/dev/null || echo "unknown")
        print_info "Existing Neovate installation detected at: ${neovate_path}"
        # print_info "Current version: ${current_version}"
        return 0
    fi
    return 1
}

# Install Neovate Code
install_neovate_code() {
    print_step "Checking for existing Neovate installation..."
    
    if check_existing_neovate; then
        print_step "Updating @neovate/code to latest version..."
        
        if npm install -g @neovate/code@latest; then
            print_success "@neovate/code updated successfully"
        else
            print_error "Failed to update @neovate/code"
            exit 1
        fi
    else
        print_step "Installing @neovate/code globally..."
        
        if npm install -g @neovate/code@latest; then
            print_success "@neovate/code installed successfully"
        else
            print_error "Failed to install @neovate/code"
            exit 1
        fi
    fi
}

# Test installation
test_installation() {
    print_step "Testing Neovate Code installation..."
    
    if command_exists neovate; then
        local version=$(neovate -v 2>/dev/null || echo "version check failed")
        print_success "Neovate Code is working: ${version}"
    else
        print_error "Neovate Code command not found"
        print_info "You may need to reload your shell or add npm global bin to PATH"
        exit 1
    fi
}

# Main installation flow
main() {
    # Check and install Node.js
    check_and_install_nodejs
    
    # Ensure npm is available
    if ! command_exists npm; then
        print_error "npm command not found after Node.js installation"
        exit 1
    fi
    
    # Install Neovate Code
    install_neovate_code
    
    # Test installation
    test_installation
    
    # Success message
    echo ""
    echo "${BOLD}${GREEN}✨ Installation Complete! ${NC}"
    echo ""
    echo "${BOLD}Next Steps${NC}"
    echo ""
    echo "${BOLD}1.${NC} If you installed nvm, reload your shell:"
    
    local CURRENT_SHELL="$(basename $SHELL)"
    case "${CURRENT_SHELL}" in
        bash)
            echo "   ${BOLD}${BLUE}source ~/.bashrc${NC}"
            ;;
        zsh)
            echo "   ${BOLD}${BLUE}source ~/.zshrc${NC}"
            ;;
        *)
            echo "   ${BOLD}${BLUE}source ~/.profile${NC}"
            ;;
    esac
    
    echo ""
    echo "${BOLD}2.${NC} Start using Neovate Code:"
    echo "   ${BOLD}neovate${NC}"
    echo ""
    echo "${BOLD}${CYAN}Happy coding! 🚀${NC}"
    echo ""
}

# Error handling
trap 'print_error "An error occurred. Installation aborted."; exit 1' ERR

# Run main function
main