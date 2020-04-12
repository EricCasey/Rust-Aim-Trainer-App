import WeaponStats from '../weapons.json'
// R, G, B, A
var getPixels = require("get-pixels");

var box_lo_main = '',  // https://i.imgur.com/6naz5u8.png
    box_lo_head = '',  // https://i.imgur.com/Tp6xfps.png
    box_lo_arms = '',  // https://i.imgur.com/FevmnlH.png   // 350 x 350
    box_lo_chest = '', // https://i.imgur.com/hjsB7af.png
    box_lo_legs = ''   // https://i.imgur.com/MKXVcfO.png

var box_mi_main = '',  // https://i.imgur.com/D6CTKMB.png
    box_mi_head = '',  // https://i.imgur.com/hIIzEyd.png
    box_mi_arms = '',  // https://i.imgur.com/IZlWaVa.png  // 150 x 150
    box_mi_chest = '', // https://i.imgur.com/DtWdpod.png
    box_mi_legs = ''   // https://i.imgur.com/Hj9MBQl.png

var box_hi_main = '',  // https://i.imgur.com/331ohYL.png
    box_hi_head = '',  // https://i.imgur.com/V5rxUXW.png
    box_hi_arms = '',  // https://i.imgur.com/LIWJhDQ.png  // 50 x 50
    box_hi_chest = '', // https://i.imgur.com/2oLipJM.png
    box_hi_legs = ''   // https://i.imgur.com/LQXP4lV.png

getPixels("https://i.imgur.com/6naz5u8.png", function(err, pixels) { box_lo_main = pixels })
getPixels("https://i.imgur.com/Tp6xfps.png", function(err, pixels) { box_lo_head = pixels })
getPixels("https://i.imgur.com/FevmnlH.png", function(err, pixels) { box_lo_arms = pixels })
getPixels("https://i.imgur.com/hjsB7af.png", function(err, pixels) { box_lo_chest = pixels })
getPixels("https://i.imgur.com/MKXVcfO.png", function(err, pixels) { box_lo_legs = pixels })

getPixels("https://i.imgur.com/D6CTKMB.png", function(err, pixels) { box_mi_main = pixels })
getPixels("https://i.imgur.com/hIIzEyd.png", function(err, pixels) { box_mi_head = pixels })
getPixels("https://i.imgur.com/IZlWaVa.png", function(err, pixels) { box_mi_arms = pixels })
getPixels("https://i.imgur.com/DtWdpod.png", function(err, pixels) { box_mi_chest = pixels })
getPixels("https://i.imgur.com/Hj9MBQl.png", function(err, pixels) { box_mi_legs = pixels })

getPixels("https://i.imgur.com/331ohYL.png", function(err, pixels) { box_hi_head = pixels })
getPixels("https://i.imgur.com/V5rxUXW.png", function(err, pixels) { box_hi_main = pixels })
getPixels("https://i.imgur.com/LIWJhDQ.png", function(err, pixels) { box_hi_arms = pixels })
getPixels("https://i.imgur.com/2oLipJM.png", function(err, pixels) { box_hi_chest = pixels })
getPixels("https://i.imgur.com/LQXP4lV.png", function(err, pixels) { box_hi_legs = pixels })

export default function(state = null, action) {

    switch (action.type) {
      case 'WEAPON_CHANGE':
        let reset = state
        reset['latest'] = []
        return reset

      case "TARGET_CHANGE":
        reset = state
        reset['latest'] = []
        return reset

      case 'OPTION_CHANGE':
        reset = state
        reset['latest'] = []
        return reset

      case 'LAYOUT_CHANGE':
        reset = state
        reset['latest'] = []
        return reset

      case 'FIRE_WEAPON':
        // console.log("FIRE WEAPON EVENT")
        
        let target = action.payload.target
        let update = state
        let log = action.payload.log
        let range = action.payload.range
        let moving = action.payload.moving ? 'moving' : 'static'
        let logName = 'target_' + moving + '_' + target.split("_")[1]
        let recoil = action.payload.log.recoil
        let rangeVal = range === 'lo' ? 350 : range === 'mi' ? 150 : 50
        let overall = update.overall[range]
        let current = update[logName][range]
        let latest = update.latest
        let dims = action.payload.log.dims
        let mousePos = action.payload.log.mousePos

        let sqrBounds = {
          x: (dims.width / 2) - (rangeVal / 2),
          y: (dims.height / 2) - (rangeVal / 2),
          size: rangeVal,
          center: {
            x: (dims.width / 2),
            y: (dims.height / 2)
          }
        }

        let points = 0
        let distance = 0
        let type = 'miss'

        // console.log(sqrBounds)

        if(target === 'target_archery' || target === 'target_darts') {

          if(target === 'target_archery') {
            // console.log("TARGET - ARCHERY")

            distance = Math.sqrt(Math.pow(((mousePos.x - recoil.x) - (dims.width / 2)), 2) + Math.pow(((mousePos.y - recoil.y) - (dims.height / 2)), 2));
            points = Math.ceil( ( 1 - ( distance / ( rangeVal / 2 ) ) ) * 10 )

            log['points'] = points >= 1 ? points : 0
            log['hit'] = distance <= (rangeVal / 2) ? true : false
            log['type'] = points === 10 ? 'bullseye' : points < 1 ? 'miss' : 'hit'

          } else if (target === 'target_darts') {
            // console.log("TARGET - DARTS") 

            distance = Math.sqrt(Math.pow(((mousePos.x - recoil.x) - (dims.width / 2)), 2) + Math.pow(((mousePos.y - recoil.y) - (dims.height / 2)), 2));

            let angle = Math.atan2((mousePos.y - recoil.y) - (dims.height / 2), (mousePos.x - recoil.x) - (dims.width / 2)) * 180 / Math.PI + 180;
            let pie = Math.ceil(angle / ( 360 / 20 ) + 0.5 ) === 21 ? 1 : Math.ceil(angle / ( 360 / 20 ) + 0.5 )
            let map = [11,14,9,12,5,20,1,18,4,13,6,10,15,2,17,3,19,7,16,8]

            points = map[pie - 1]

            if(distance <= ((rangeVal - ((rangeVal / 100) * 24)) / 2) && distance >= ((rangeVal - ((rangeVal / 100) * 28)) / 2)) {
              points = map[pie - 1] * 2
              type = 'double'
            } else if(distance <= ((rangeVal - ((rangeVal / 100) * 52)) / 2) && distance >= ((rangeVal - ((rangeVal / 100) * 56)) / 2)) {
              points = map[pie - 1] * 3
              type = 'triple'
            } else if(distance <= ((rangeVal - ((rangeVal / 100) * 93)) / 2) && distance >= ((rangeVal - ((rangeVal / 100) * 97)) / 2)) {
              type = 'bull'
              points = 25
            } else if(distance <= ((rangeVal - ((rangeVal / 100) * 97)) / 2)) {
              type = 'bullseye'
              points = 50
            }

            log['points'] = points
            log['hit'] = distance <= ((rangeVal - ((rangeVal / 100) * 24)) / 2) ? true : false
            log['type'] = type
          }

        } else if(target === 'target_player') {
            // console.log("TARGET - PLAYER")
            // console.log(box_main)
            // console.log(box_main.shape)
            // console.log("Recoil", recoil)
            // console.log("MousePos: ", mousePos)
            // console.log("Range: ", rangeVal)
            // console.log("Dimensions: ", dims)
            // console.log("Square Bounds: ", sqrBounds)

            let inPos = {
              x: (mousePos.x - recoil.x) - sqrBounds.x,
              y: (mousePos.y - recoil.y) - sqrBounds.y
            }

            let pixRow = inPos.y // - sqrBounds.y

            // console.log(inPos, dims)

            if(inPos.x > 0 && inPos.x <= rangeVal && inPos.y > 0 && inPos.y <= rangeVal) {
              // console.log("inside sqr")
              if(range === 'lo') {
                let depth = (pixRow - 1) * box_lo_main.shape[0] + inPos.x
  
                // console.log(depth)
  
                log['hit'] = box_lo_main.data[(depth * 4) + 0] + box_lo_main.data[(depth * 4) + 1] + box_lo_main.data[(depth * 4) + 2] + box_lo_main.data[(depth * 4) + 3]  > 0 
                  ? true : false
  
                if(box_lo_head.data[(depth * 4) + 0] + box_lo_head.data[(depth * 4) + 1]+ box_lo_head.data[(depth * 4) + 2] + box_lo_head.data[(depth * 4) + 3] > 0) {
                  type = 'head'
                } else if(box_lo_chest.data[(depth * 4) + 0] + box_lo_chest.data[(depth * 4) + 1] + box_lo_chest.data[(depth * 4) + 2] + box_lo_chest.data[(depth * 4) + 3] > 0) {
                  type = 'chest'
                } else if(box_lo_arms.data[(depth * 4) + 0] + box_lo_arms.data[(depth * 4) + 1] + box_lo_arms.data[(depth * 4) + 2] + box_lo_arms.data[(depth * 4) + 3] > 0) {
                  type = 'arms'
                } else if(box_lo_legs.data[(depth * 4) + 0] + box_lo_legs.data[(depth * 4) + 1] + box_lo_legs.data[(depth * 4) + 2] + box_lo_legs.data[(depth * 4) + 3] > 0) {
                  type = 'legs'
                }
              } else if (range === 'mi') {
                let depth = (pixRow - 1) * box_mi_main.shape[0] + inPos.x
  
                log['hit'] = box_mi_main.data[(depth * 4) + 0] + box_mi_main.data[(depth * 4) + 1] + box_mi_main.data[(depth * 4) + 2] + box_mi_main.data[(depth * 4) + 3] > 0 
                  ? true : false
    
                if(box_mi_head.data[(depth * 4) + 0] + box_mi_head.data[(depth * 4) + 1] + box_mi_head.data[(depth * 4) + 2] + box_mi_head.data[(depth * 4) + 3] > 0) {
                  type = 'head'
                } else if(box_mi_chest.data[(depth * 4) + 0] + box_mi_chest.data[(depth * 4) + 1] + box_mi_chest.data[(depth * 4) + 2] + box_mi_chest.data[(depth * 4) + 3] > 0) {
                  type = 'chest'
                } else if(box_mi_arms.data[(depth * 4) + 0] + box_mi_arms.data[(depth * 4) + 1] + box_mi_arms.data[(depth * 4) + 2] + box_mi_arms.data[(depth * 4) + 3] > 0) {
                  type = 'arms'
                } else if(box_mi_legs.data[(depth * 4) + 0] + box_mi_legs.data[(depth * 4) + 1] + box_mi_legs.data[(depth * 4) + 2] + box_mi_legs.data[(depth * 4) + 3] > 0) {
                  type = 'legs'
                }
              } else if (range === 'hi') {
                let depth = (pixRow - 1) * box_hi_main.shape[0] + inPos.x
  
                log['hit'] = box_hi_main.data[(depth * 4) + 0] + box_hi_main.data[(depth * 4) + 1] + box_hi_main.data[(depth * 4) + 2] + box_hi_main.data[(depth * 4) + 3] > 0 ? true : false
    
                if(box_hi_head.data[(depth * 4) + 0] + box_hi_head.data[(depth * 4) + 1] + box_hi_head.data[(depth * 4) + 2] + box_hi_head.data[(depth * 4) + 3] > 0) {
                  type = 'head'
                } else if(box_hi_chest.data[(depth * 4) + 0] + box_hi_chest.data[(depth * 4) + 1] + box_hi_chest.data[(depth * 4) + 2] + box_hi_chest.data[(depth * 4) + 3] > 0) {
                  type = 'chest'
                } else if(box_hi_arms.data[(depth * 4) + 0] + box_hi_arms.data[(depth * 4) + 1] + box_hi_arms.data[(depth * 4) + 2] + box_hi_arms.data[(depth * 4) + 3] > 0) {
                  type = 'arms'
                } else if(box_hi_legs.data[(depth * 4) + 0] + box_hi_legs.data[(depth * 4) + 1] + box_hi_legs.data[(depth * 4) + 2] + box_hi_legs.data[(depth * 4) + 3] > 0) {
                  type = 'legs'
                }
              } else {
                // console.log("else")
              }
            } else {
              // console.log('outside sqr')
            }


            log['points'] = type === 'miss' ? 0 : WeaponStats[log.weapon][`damage_${type}`]
            log['type'] = type

        }

        log['topLeft'] = sqrBounds

        overall.push(log)
        current.push(log)
        latest.push(log)

        update['overall'][range] = overall
        update[logName][range] = current
        update.latest = log.shotNum === 0 ? [ log ] : latest

        
        // {
        //   mousePos: {x,y},
        //   target: '',
        //   hit: true/false, 
        //   points: num,
        //   type: head, chest, leg, arms, target, bullseye
        //   weapon: '',
        //   shotNum: 0,
        // }

        return { update, ...state }

      case '@@redux/INIT':
        return {
          latest: [],
          overall: { lo: [], mi: [], hi : [] },
          target_static_archery: { lo: [], mi: [], hi : [] },
          target_static_darts: { lo: [], mi: [], hi : [] },
          target_static_player: { lo: [], mi: [], hi : [] },
          target_moving_archery: { lo: [], mi: [], hi : [] },
          target_moving_player: { lo: [], mi: [], hi : [] },
          target_moving_darts: { lo: [], mi: [], hi : [] }
        }
      default:
        return {
          latest: [],
          overall: { lo: [], mi: [], hi : [] },
          target_static_archery: { lo: [], mi: [], hi : [] },
          target_static_darts: { lo: [], mi: [], hi : [] },
          target_static_player: { lo: [], mi: [], hi : [] },
          target_moving_archery: { lo: [], mi: [], hi : [] },
          target_moving_player: { lo: [], mi: [], hi : [] },
          target_moving_darts: { lo: [], mi: [], hi : [] }
        }
    }
  }