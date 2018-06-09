# cloud-link [![Build Status](https://travis-ci.org/noamokman/cloud-link.svg?branch=master)](https://travis-ci.org/noamokman/cloud-link) [![Coverage Status](https://coveralls.io/repos/github/noamokman/cloud-link/badge.svg?branch=master)](https://coveralls.io/github/noamokman/cloud-link?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/noamokman/cloud-link.svg)](https://greenkeeper.io/)
A cli tool to help create symlinks from your synced cloud directory to various locations

Common use cases:
* config files
* game saves
* projects folder

## Installation
As cli tool
``` bash
$ [sudo] npm install cloud-link -g
```

Programmatically
``` bash
$ [sudo] npm install cloud-link
```

## Usage
### CLI
#### Options
``` bash
$  cloud-link 0.0.0 - automatically link cloud folders
     
   USAGE

     cloud-link <command> [options]

   COMMANDS

     add <name> [src] <dest>      Add a new link                          
     apply [names...]             Apply all existing links                
     clean                        Delete all configured links             
     clear                        Clear the path to cloud folder          
     info                         Print the cloud link configuration      
     init <path>                  Set the path to the cloud folder        
     initialized                  Check if this computer was initialized  
     list                         List configured links                   
     remove <name>                Remove a link                           
     status [names...]            Show the link status of configured links
     help <command>               Display help for a specific command     

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    
```
#### Synonym
This module is exported as `cloud-link` and as `clink`.

### Getting started
First you need to indicate where your cloud folder is.
```bash
cloud-link init ~/Google Drive
```

Then add links with the `add` command
```bash
cloud-link add hyper .hyper.js ~/.hyper.js
```
This will create a symlink between the file in your cloud folder and the given destination

See all links with
```bash
cloud-link list
```

## Disclaimer
Most actions overwrite files, so make sure that you provide the right path

## License

[MIT](LICENSE) © [Noam Okman](https://github.com/noamokman)