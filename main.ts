namespace SpriteKind {
    export const Drone = SpriteKind.create()
    export const Drone2 = SpriteKind.create()
    export const Enemy2 = SpriteKind.create()
    export const Enemy3 = SpriteKind.create()
}
namespace StatusBarKind {
    export const Enemy2Health = StatusBarKind.create()
    export const Enemy3Health = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy3, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bust_bullet = sprites.createProjectileFromSprite(img`
        . . . . . 9 . . . . . 
        . . . . 9 1 9 . . . . 
        . . . . . 9 . . . . . 
        . . . . . . . . . . . 
        . . . . . . . . . . . 
        . . . . . . . . . . . 
        . . . . . . . . . . . 
        . . . . . . . . . . . 
        . . . . . . . . . . . 
        . . . . . . . . . . . 
        . . . . . . . . . . . 
        `, bust_ship, 0, -75)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy3, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Enemy3Health, otherSprite).value += -10
    sprites.destroy(sprite)
})
statusbars.onZero(StatusBarKind.Enemy3Health, function (status) {
    if (hard) {
        sprites.destroy(status.spriteAttachedTo(), effects.disintegrate, 500)
        info.changeScoreBy(1)
        scene.cameraShake(12, 500)
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
        if (buster) {
            info.changeScoreBy(1)
            scene.cameraShake(8, 500)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
            sprites.destroy(status.spriteAttachedTo(), effects.disintegrate, 500)
        }
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    if (easy) {
        sprites.destroy(status.spriteAttachedTo(), effects.disintegrate, 500)
        info.changeScoreBy(1)
        scene.cameraShake(4, 500)
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    }
})
info.onScore(10, function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy2, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Enemy2Health, otherSprite).value += -10
    sprites.destroy(sprite)
})
statusbars.onZero(StatusBarKind.Enemy2Health, function (status) {
    if (medium) {
        sprites.destroy(status.spriteAttachedTo(), effects.disintegrate, 500)
        info.changeScoreBy(1)
        scene.cameraShake(8, 500)
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
        if (busty) {
            info.changeScoreBy(1)
            scene.cameraShake(8, 500)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
            sprites.destroy(status.spriteAttachedTo(), effects.disintegrate, 500)
        }
    }
})
info.onLifeZero(function () {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    info.changeLifeBy(-1)
    scene.cameraShake(8, 500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
info.onScore(5, function () {
    if (medium) {
        HasBusty = true
        busty = sprites.create(img`
            . . 2 . . 
            . 2 9 2 . 
            . c 2 c . 
            . c . c . 
            `, SpriteKind.Drone)
        busty.follow(bust_ship, 50)
    }
    if (hard) {
        HasBuster = true
        buster = sprites.create(img`
            . . . . . . . 
            . . . 2 . . . 
            . . 2 2 2 . . 
            8 8 b 9 b 8 8 
            . . 2 2 2 . . 
            . 2 . 2 . 2 . 
            . . . . . . . 
            `, SpriteKind.Drone2)
        buster.follow(bust_ship, 25)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -10
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
let statusbar3: StatusBarSprite = null
let hard_enemy: Sprite = null
let statusbar2: StatusBarSprite = null
let medium_enemy: Sprite = null
let statusbar: StatusBarSprite = null
let easy_enemy: Sprite = null
let busty: Sprite = null
let buster: Sprite = null
let bust_bullet: Sprite = null
let bust_ship: Sprite = null
let HasBuster = false
let HasBusty = false
let hard = false
let medium = false
let easy = false
easy = false
medium = false
hard = false
HasBusty = false
HasBuster = false
effects.starField.startScreenEffect()
game.splash("Prs \"A\" button in console", "Or Prs Q in keyboard")
game.setDialogTextColor(15)
game.setDialogFrame(img`
    f f f f f f f f f f f f f f f 
    f c c c c c c c c c c c c c f 
    f c e e e e e e e e e e e c f 
    f c e b b b b b b b b b e c f 
    f c e b d d d d d d d b e c f 
    f c e b d 1 1 1 1 1 d b e c f 
    f c e b d 1 1 1 1 1 d b e c f 
    f c e b d 1 1 1 1 1 d b e c f 
    f c e b d 1 1 1 1 1 d b e c f 
    f c e b d 1 1 1 1 1 d b e c f 
    f c e b d d d d d d d b e c f 
    f c e b b b b b b b b b e c f 
    f c e e e e e e e e e e e c f 
    f c c c c c c c c c c c c c f 
    f f f f f f f f f f f f f f f 
    `)
game.setDialogCursor(img`
    . . c c c c c . . 
    . c 6 7 7 7 7 c . 
    c 6 7 7 6 7 7 7 c 
    c 7 7 6 7 6 7 7 c 
    c 7 7 6 6 6 7 7 c 
    c 7 7 6 7 6 7 7 c 
    c 7 7 7 7 7 7 6 c 
    . c 7 7 7 6 6 c . 
    . . c c c c c . . 
    `)
bust_ship = sprites.create(img`
    . . . . . . . . . . . 
    . . . 2 . . . 2 . . . 
    . . 2 2 2 . 2 2 2 . . 
    . 2 2 . 2 2 2 . 2 2 . 
    . 2 . . 2 9 2 . . 2 . 
    . . . . 2 9 2 . . . . 
    . . . . 2 2 2 . . . . 
    . . . . 2 2 2 . . . . 
    . . . . . 2 . . . . . 
    . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(bust_ship)
bust_ship.setStayInScreen(true)
story.showPlayerChoices("Play", "How to play")
if (story.checkLastAnswer("Play")) {
    game.splash("Select Dificulty")
    story.showPlayerChoices("Easy", "Medium", "Hard")
    if (story.checkLastAnswer("Easy")) {
        easy = true
        info.setLife(3)
    }
    if (story.checkLastAnswer("Medium")) {
        medium = true
        info.setLife(6)
    }
    if (story.checkLastAnswer("Hard")) {
        hard = true
        info.setLife(9)
    }
}
if (story.checkLastAnswer("How to play")) {
    game.showLongText("Press \"A\" to shoot", DialogLayout.Full)
    game.showLongText("Shoot enemys to gain points", DialogLayout.Full)
    game.showLongText("10 points = win", DialogLayout.Full)
    game.showLongText("And 3 dificulties", DialogLayout.Full)
    game.reset()
}
game.setGameOverMessage(true, "Victory!")
game.setGameOverMessage(false, "Defeat")
game.setGameOverPlayable(false, music.melodyPlayable(music.jumpDown), false)
game.setGameOverPlayable(true, music.melodyPlayable(music.jumpUp), false)
game.setGameOverEffect(false, effects.slash)
game.setGameOverEffect(true, effects.dissolve)
game.onUpdateInterval(2000, function () {
    if (easy) {
        easy_enemy = sprites.createProjectileFromSide(img`
            . . . . . . . . . 
            . . 1 . . . 1 . . 
            . . 1 1 1 1 1 . . 
            . . 1 1 3 1 1 . . 
            . . 1 1 3 1 1 . . 
            . . . 1 3 1 . . . 
            . . . 1 1 1 . . . 
            . . . . 1 . . . . 
            . . . . . . . . . 
            `, 0, 30)
        easy_enemy.x = randint(20, 115)
        easy_enemy.setKind(SpriteKind.Enemy)
        statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar.setBarBorder(0.5, 3)
        statusbar.attachToSprite(easy_enemy)
        statusbar.setColor(7, 2, 3)
        statusbar.max = 30
        statusbar.setLabel("HP E1", 7)
    }
})
game.onUpdateInterval(2000, function () {
    if (medium) {
        medium_enemy = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . 
            . . . . . 7 . . . . . 
            . . 7 . 7 . 7 . 7 . . 
            . . . 7 7 7 7 7 . . . 
            . . . . 7 5 7 . . . . 
            . . . 7 7 5 7 7 . . . 
            . . . . 7 7 7 . . . . 
            . . . . . 7 . . . . . 
            . . . . . 7 . . . . . 
            . . . . . . . . . . . 
            . . . . . . . . . . . 
            `, 0, 25)
        medium_enemy.x = randint(20, 115)
        medium_enemy.setKind(SpriteKind.Enemy2)
        statusbar2 = statusbars.create(30, 4, StatusBarKind.Enemy2Health)
        statusbar2.setBarBorder(0.5, 4)
        statusbar2.attachToSprite(medium_enemy)
        statusbar2.setColor(5, 8, 4)
        statusbar2.max = 60
        statusbar2.setLabel("HP E2", 5)
    }
})
game.onUpdateInterval(2000, function () {
    if (hard) {
        hard_enemy = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . 
            . . . . . . a . . . . . . 
            . . . . . a a a . . . . . 
            . . a a a . a . a a a . . 
            . . . a a . a . a a . . . 
            . . . . a a a a a . . . . 
            . . . . . a 4 a . . . . . 
            . . . . . a 4 a . . . . . 
            . . . . a a 4 a a . . . . 
            . . . . a a a a a . . . . 
            . . . . . a a a . . . . . 
            . . . . . . a . . . . . . 
            . . . . . . . . . . . . . 
            `, 0, 15)
        hard_enemy.x = randint(20, 115)
        hard_enemy.setKind(SpriteKind.Enemy3)
        statusbar3 = statusbars.create(40, 4, StatusBarKind.Enemy3Health)
        statusbar3.setBarBorder(0.5, 10)
        statusbar3.attachToSprite(hard_enemy)
        statusbar3.setColor(2, 9, 5)
        statusbar3.max = 90
        statusbar3.setLabel("HP E3", 2)
    }
})
game.onUpdateInterval(3000, function () {
    if (hard) {
        if (HasBuster) {
            buster.sayText("A1 enemy damage", 1000, false)
            sprites.destroy(hard_enemy, effects.fire, 500)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
        }
    }
})
game.onUpdateInterval(3000, function () {
    if (medium) {
        if (HasBusty) {
            busty.sayText("Damage enemy", 1000, false)
            sprites.destroy(medium_enemy, effects.fire, 500)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
        }
    }
})
