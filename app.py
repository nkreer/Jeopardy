import eel

eel.init("web")


@eel.expose
def quit_app():
    quit()


eel.start("main.html", block=False)

eel.populateBoard(6, 5)

while True:
    eel.sleep(1.0)