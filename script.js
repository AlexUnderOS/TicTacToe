const klase_x = 'x'
const klase_o = 'circle'

let speletajs_O_score = 0
let speletajs_X_score = 0

/*  0 1 2
    3 4 5
    6 7 8 
*/

const uzvaras_nosacijumi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const visi_laucini = document.querySelectorAll('.cell')
const rezultatu_logs = document.querySelector('#resultBox')
const rezultatu_pazinojums = document.querySelector('.resultInfo')
const atjaunot_poga = document.querySelector('#restartButton')
const attelot_speletaju = document.querySelector('.display')
const score_text = document.querySelector('#scoreText')
let speletajs_O

sakt_speli()

function sakt_speli() {
    speletajs_O = false
    speletajs_O_score = localStorage.getItem('o_player')
    speletajs_X_score = localStorage.getItem('x_player')
    reset_paint_over_win_combination()
    rezultatu_logs.classList.remove('show')
    visi_laucini.forEach((laucins) => {
        laucins.classList.remove(klase_x)
        laucins.classList.remove(klase_o)
        laucins.addEventListener('click', lietotaja_darbiba, { once: true })
    })
}

function lietotaja_darbiba(klikskis) {
    const laucins = klikskis.target
    const aktivais_speletajs = speletajs_O ? klase_o : klase_x

    atzimet_laucinu(laucins, aktivais_speletajs)
    if (parbaudit_uzvaru(aktivais_speletajs)) {
        beigt_speli(false)
    } else if (neizskirts()) {
        beigt_speli(true)
    } else {
        mainit_speletaju()
    }
}

function atzimet_laucinu(laucins, aktivais_speletajs) {
    laucins.classList.add(aktivais_speletajs)
}

function mainit_speletaju() {
    speletajs_O = !speletajs_O
    attelot_speletaju.innerText = `${speletajs_O ? 'O' : 'X'}`
    change_bgcolor(speletajs_O)
}

function neizskirts() {
    return [... visi_laucini].every((laucins) => {
        return (
            laucins.classList.contains(klase_x) ||
            laucins.classList.contains(klase_o)
        )
    })
}

atjaunot_poga.addEventListener('click', sakt_speli)

function set_score(speletajs_O_winner) {
    return speletajs_O_winner ? speletajs_O_score++ : speletajs_X_score++
}

function update_score() {
    score_text.innerHTML = `X: ${speletajs_X_score}<br> O: ${speletajs_O_score}`
    localStorage.setItem('x_player', speletajs_X_score)
    localStorage.setItem('o_player', speletajs_O_score)
}

function reset_score() {
    localStorage.setItem('x_player', 0)
    localStorage.setItem('o_player', 0)
    score_text.innerHTML = `X: 0<br> O: 0`
}

const myBody = document.body
const x_color = '#1c2c1a'
const o_color = '#1a252c'
function change_bgcolor(current_player) {
    let current_color = current_player ? x_color : o_color
    myBody.style.backgroundColor = current_color
}

function parbaudit_uzvaru(aktivais_speletajs) {
    let winningCombination = null
    uzvaras_nosacijumi.some((nosacijums) => {
        if (
            nosacijums.every((index) =>
                visi_laucini[index].classList.contains(aktivais_speletajs)
            )
        ) {
            winningCombination = nosacijums
            return true
        }
        return false
    })
    return winningCombination
}

function beigt_speli(neizskirts) {
    if (neizskirts) {
        rezultatu_pazinojums.innerText = 'Neizšķirts rezultāts!'
    } else {
        rezultatu_pazinojums.innerText = `Spēlētājs ${
            speletajs_O ? 'O' : 'X'
        } uzvarēja!`

        const winningCombination = parbaudit_uzvaru(
            speletajs_O ? klase_o : klase_x
        )
        if (winningCombination) {
            paint_over_win_combination(winningCombination)
        }
    }
    rezultatu_logs.classList.add('show')
    set_score(speletajs_O)
    update_score()
}

function paint_over_win_combination(winningCombination) {
    winningCombination.forEach((index) => {
        visi_laucini[index].style.backgroundColor = '#00540f'
    })
}

function reset_paint_over_win_combination() {
    visi_laucini.forEach((laucins) => {
        laucins.style.backgroundColor = 'black'
    })
}
