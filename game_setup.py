import json
# Setting up the game of Jeopardy

# Get the defaults from the config file
with open("config.json") as configFile:
    config = json.load(configFile)

# Get all the data into variables we can work with
colors = config["colors"]
keys = config["keys"]
values = config["values"]
defaultbar = config["default_infobar"]
host_screen = config["host_screen"]
control_keys = config["control_keys"]

players = {}

def create_players():
    global players
    while True:
        player = input("Player name: ");
        if player is "":
            # Configuration is done when no name is entered
            break

        default_color = colors[len(players)]
        color = input("Color (leave blank for " + default_color + "): ")
        # Assign the default color if no other is supplied
        if color is "":
            color = default_color

        key = get_unique_key()

        # Create player and assign given color and points
        players[player] = {}
        players[player]["color"] = color
        players[player]["points"] = 0
        players[player]["key"] = key

    return players


# Ask for a player's key and check for duplicates
def get_unique_key():
    default_key = keys[len(players)]
    # Ask for keys until we have a unique one
    while True:
        key = input("Key (Leave blank for " + default_key + "): ")
        # Assign the chosen buzzer key
        if key is "":
            key = default_key

        # Cannot be in control keys
        if key in control_keys.values():
            print("You specified a key which cannot be used.")
        else:
            # There should also be a check for duplicates between players. 
            # That might be something to consider for the graphical setup.
            break

    return key