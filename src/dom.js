let draggedShipEl = null;

export function renderPlayerBoardWrapper(
  board,
  playerName,
  onCellClick,
  placeShipHandler,
  previewHandler,
) {
  const wrapper = document.createElement("div");
  wrapper.id = `${playerName}-wrapper`;

  const title = document.createElement("p");
  title.textContent = `${playerName} Board`;

  const boardPlayer = renderBoard(
    board,
    playerName,
    onCellClick,
    placeShipHandler,
    previewHandler,
  );
  wrapper.append(title, boardPlayer);
  return wrapper;
}

export function renderBoard(
  board,
  playerName,
  onCellClick,
  onCellDrop,
  previewHandler,
) {
  const boardEl = document.createElement("div");
  boardEl.classList.add("board");
  boardEl.id = `board-${playerName}`;

  if (onCellClick) {
    boardEl.addEventListener("click", (e) => {
      if (!e.target.classList.contains("cell")) {
        return;
      }
      const cell = e.target;
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);
      onCellClick(x, y);
    });
  }
  if (onCellDrop) {
    boardEl.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    boardEl.addEventListener("drop", (e) => {
      if (!e.target.classList.contains("cell")) {
        return;
      }
      const length = Number(e.dataTransfer.getData("text/plain"));

      const cell = e.target;
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);

      const success = onCellDrop(length, x, y);
      if (success && draggedShipEl) {
        draggedShipEl.remove();
        draggedShipEl = null;
      }
    });
    boardEl.addEventListener("dragenter", (e) => {
      if (!e.target.classList.contains("cell")) {
        return;
      }
      const cell = e.target;
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);

      const shipLength = Number(draggedShipEl.getAttribute("data-length"));
      const cellPreviewCoor = previewHandler(shipLength, x, y);

      const cells = boardEl.querySelectorAll(".cell:not(.ship)");
      cells.forEach((cell) => {
        cell.className = "cell";
      });
      cellPreviewCoor.forEach((coor) => {
        const cellToColor = boardEl.querySelector(
          `[data-x="${coor[0]}"][data-y="${coor[1]}"]`,
        );
        cellToColor.className = "cell valid-preview";
      });
    });
    boardEl.addEventListener("dragleave", (e) => {
      if (boardEl.contains(e.relatedTarget)) {
        return;
      }
      const cells = boardEl.querySelectorAll(".cell:not(.ship)");
      cells.forEach((cell) => {
        cell.className = "cell";
      });
    });
  }

  for (let i = 0; i < board.rows; i++) {
    for (let j = 0; j < board.colums; j++) {
      const cellEL = document.createElement("div");
      cellEL.dataset.x = i;
      cellEL.dataset.y = j;
      // cellEL.dataset.value = board.board[i][j].getValue()
      cellEL.setAttribute("class", "cell");
      boardEl.append(cellEL);
    }
  }
  return boardEl;
}

export function updateBoard(player, showShips = false) {
  let allCellState = player.board.getCellState();
  const boardEL = document.querySelector(`#board-${player.name}`);
  for (let i = 0; i < allCellState.length; i++) {
    for (let j = 0; j < allCellState[i].length; j++) {
      const { hasShip, isHit } = allCellState[i][j];
      const cellEL = boardEL.querySelector(`[data-x="${i}"][data-y="${j}"]`);

      cellEL.className = "cell"; //reset the classe name for each update(avoid accumulating class)
      if (isHit && hasShip) {
        cellEL.classList.add("hit");
      }
      if (isHit && !hasShip) {
        cellEL.classList.add("miss");
      }
      if (!isHit && hasShip && showShips) {
        cellEL.classList.add("ship");
      }
    }
  }
}

export function renderDock(shipLengths, onRotate) {
  const dockEl = document.createElement("div");
  dockEl.classList.add("dock");
  dockEl.id = "dock";

  const shipWrapperEl = document.createElement("div");
  shipWrapperEl.classList.add("ship-dock-wrapper-h");
  shipWrapperEl.id = "ship-dock-wrapper";

  dockEl.append(shipWrapperEl);

  shipLengths.forEach((ship) => {
    const shipEl = createDockShip(ship);
    shipWrapperEl.append(shipEl);
  });
  const btnRotate = document.createElement("button");
  btnRotate.textContent = "Rotate";
  btnRotate.addEventListener("click", () => {
    onRotate();
  });

  dockEl.append(btnRotate);

  return dockEl;
}

export function createDockShip(length) {
  const shipEl = document.createElement("div");
  shipEl.classList.add("ship-in-dock-h");
  shipEl.classList.add("ship-in-dock");
  shipEl.draggable = true;
  shipEl.dataset.length = length;
  shipEl.addEventListener("dragstart", (e) => {
    draggedShipEl = e.currentTarget;
    e.dataTransfer.setData("text/plain", e.currentTarget.dataset.length);
  });
  for (let i = 0; i < length; i++) {
    const unitOfShip = document.createElement("div");
    unitOfShip.classList.add("unit");
    shipEl.append(unitOfShip);
  }
  return shipEl;
}

export function clearDock() {
  const dock = document.querySelector("#dock");
  if (dock !== null) {
    dock.remove();
  }
}

// render winner div
export function renderWinner(winnerTextEl, winner) {
  winnerTextEl.textContent = `${winner} win!!`;
}
export function clearWinner(winnerTextEl) {
  winnerTextEl.textContent = ``;
}

export function renderMenu(onModeSelect) {
  const menuDiv = document.createElement("div");
  menuDiv.id = "intro-menu-wrapper";

  const title = document.createElement("p");
  title.textContent = "Choose the mode";

  const btnVsComputer = document.createElement("button");
  btnVsComputer.classList.add("btn-vs-computer");
  btnVsComputer.textContent = "Human VS Computer";
  btnVsComputer.addEventListener("click", () => {
    onModeSelect("vs-computer");
  });

  const btnVsHuman = document.createElement("button");
  btnVsHuman.classList.add("btn-vs-human");
  btnVsHuman.textContent = "Human VS Human";
  btnVsHuman.addEventListener("click", () => {
    onModeSelect("vs-human");
  });

  menuDiv.append(title, btnVsHuman, btnVsComputer);
  return menuDiv;
}

export function renderPassScreen(playerName, onReady) {
  const passDiv = document.createElement("div");
  passDiv.id = "pass-screen-wrapper";

  const title = document.createElement("p");
  title.textContent = `Pass the computer to: ${playerName}`;

  const btnOnReady = document.createElement("button");
  btnOnReady.classList.add("btn-on-ready");
  btnOnReady.textContent = "OK";
  btnOnReady.addEventListener("click", () => {
    onReady();
  });

  passDiv.append(title, btnOnReady);
  return passDiv;
}

export function renderNewGameBtn(onNewGame) {
  const btnResetGame = document.createElement("button");
  btnResetGame.classList.add("btn-reset");
  btnResetGame.textContent = "New Game";
  btnResetGame.addEventListener("click", () => {
    onNewGame();
  });
  return btnResetGame;
}

export function renderTurnResult(
  resultText,
  onNext,
  viewButton = true,
  isGameOver = false,
) {
  const turnResultWrapper = document.createElement("div");
  if (isGameOver) {
    turnResultWrapper.id = "turn-end-game-wrapper";
  } else {
    turnResultWrapper.id = "turn-result-wrapper";
  }

  const text = document.createElement("p");
  text.textContent = resultText;

  const btnOnNext = document.createElement("button");
  if (isGameOver) {
    btnOnNext.textContent = "See the final result";
  } else {
    btnOnNext.textContent = "Next Player";
  }
  btnOnNext.addEventListener("click", () => {
    onNext();
  });

  if (viewButton) {
    turnResultWrapper.append(text, btnOnNext);
  } else {
    turnResultWrapper.append(text);
  }
  return turnResultWrapper;
}
