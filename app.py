import eel, json, sys, time, random
import game_setup

# Do the game setup
players = game_setup.create_players()
last_points = ""

# Load the clues from json
with open(sys.argv[1]) as clueFile: 
    clues = json.load(clueFile)

# Preprocess the clues
for category in clues:
    # Add default values
    if not "values" in category:
        category["values"] = game_setup.values

    for clue in category["clues"]:
        # Add the "played"-flag
        if not "played" in clue:
            clue["played"] = False
        
        # Add the "double flag"
        if not "double" in clue:
            clue["double"] = False

# Manage the game, be a bridge, etc.
eel.init("web")


@eel.expose
def quit_app():
    quit()


@eel.expose
def show_clue(category_index, clue_index, value, double=False):
    # Check if we have a double jeopardy (and not selected a new value yet)
    if clues[category_index]["clues"][clue_index]["double"] and double is False:
        eel.doubleJeopardy(clues, category_index, clue_index, value, last_points, players)
    elif double is True:
        eel.showClue(clues, category_index, clue_index, value, last_points, players)
    else:
        eel.showClue(clues, category_index, clue_index, value, "", players)


# Call the necessary js-functions to re-draw the board
@eel.expose
def update_board():
    eel.populateBoard(clues, players)
    eel.printPlayers(players)
    eel.updateInfoDisplay({1: {"color": "black", "text": game_setup.defaulttext}})


# Add points to the player
@eel.expose
def points_to_player(name, points):
    global players
    global last_points
    print(points, "for", name)
    # If points are positive, save last_points
    if float(points) >= 0:
        last_points = name

    players[name]["points"] += float(points)


@eel.expose
def solved_clue(name, category_index, clue_index):
    clues[category_index]["clues"][clue_index]["played"] = name


# Export the current game to files (so you can continue to play later)
@eel.expose
def export_game():
    with open("clues/clueDump-" + str(time.time()) + ".json", "w+") as clueDump:
        json.dump(clues, clueDump)

    with open("playerDump-" + str(time.time()) + ".json", "w+") as playerDump:
        json.dump(players, playerDump)


@eel.expose()
def random_player(updateInfoDisplay):
    global last_points
    last_points = random.choice(list(players.keys()))
    if updateInfoDisplay:
        eel.updateInfoDisplay([{"color": players[last_points]["color"], "text": last_points}])


# Before we start, randomly assign a player to last_points    
random_player(False)

eel.start("main.html", block=False)

eel.setupKeys(players)

while True:
    eel.sleep(1.0)