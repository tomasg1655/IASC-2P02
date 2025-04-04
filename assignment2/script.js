import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import * as dat from "lil-gui"

/************
 ** SETUP **
 ************/
 // Sizes
 const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
   aspectRatio:window.innerWidth / window.innerHeight
 }

 // Resizing
 window.addEventListener('resize', () => {
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight
   sizes.aspectRatio = window.innerWidth / window.innerHeight

   camera.aspect = sizes.aspectRatio
   camera.updateProjectionMatrix()

   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 })

/************
 ** SCENE **
 ************/

 //Canvas
 const canvas = document.querySelector('.webgl')

 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('gray')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(20, 2, 25)

 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
 })
 renderer.setSize(sizes.width, sizes.height)

 //Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true

/*************
** Lights **
*************/
 //Directional light
 const directionalLight = new THREE.DirectionalLight(0x404040, 100)
 scene.add(directionalLight)

/*************
** Meshes **
*************/ 
 //sphere Geometry
 const sphereGeometery = new THREE.SphereGeometry(5.5)

 const drawSphere = (height, params) =>
 {
   //Create sphere material
   const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(params.color)
   })

   //Create sphere
   const sphere = new THREE.Mesh(sphereGeometery, material)

   //Position sphere
   sphere.position.y = height - 5
   sphere.position.x = (Math.random() ) * params.diameter
   sphere.position.z = (Math.random() ) * params.diameter

   //Scale sphere
   sphere.scale.x = params.scale
   sphere.scale.y = params.scale
   sphere.scale.z = params.scale

   //Randomize rotation
   if(params.randomized){
    sphere.rotation.x = Math.random() * 2 * Math.PI
    sphere.rotation.y = Math.random() * 2 * Math.PI
    sphere.rotation.z = Math.random() * 2 * Math.PI
   }

   //Add to group
   params.group.add(sphere)
 }

  const drawTorus = (height, params) => 
  {
  const torusGeo = new THREE.TorusGeometry(20, 0.25, 22)
  const torusMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(params.color),
      transparent: true,
      opacity: 1.0,
  })

  //create sphere
  const torus = new THREE.Mesh(torusGeo, torusMat)

  //scale sphere
  torus.scale.x = params.scale * 0.5
  torus.scale.y = params.scale * 0.5
  torus.scale.z = params.scale * 0.5

  //position sphere
  torus.position.x = (Math.random() - 1) * params.diameter
  torus.position.z = (Math.random() - 1) * params.diameter
  torus.position.y = height - 5

  params.group.add(torus)
  }

  const drawIsosahedron = (height, params) => 
    {
    const isosahedronGeo = new THREE.IcosahedronGeometry (1, 0)
    const isosahedronMat = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(params.color), 
        transparent: true, 
        opacity: 1.0 
    })

//create iso
const isosahedron = new THREE.Mesh(isosahedronGeo, isosahedronMat)

//scale iso
isosahedron.scale.x = params.scale * 10
isosahedron.scale.y = params.scale * 10
isosahedron.scale.z = params.scale * 10

//position iso
isosahedron.position.x = (Math.random() - 0.5) * params.diameter
isosahedron.position.z = (Math.random() - 0.5) * params.diameter
isosahedron.position.y = height - 10

//randomize iso rotation
if(params.randomized)
    {
        isosahedron.rotation.x = Math.random() * 2 * Math.PI
        isosahedron.rotation.z = Math.random() * 2 * Math.PI
        isosahedron.rotation.y = Math.random() * 2 * Math.PI
    }

    params.group.add(isosahedron);
}

/*******
** UI **
********/
 //UI
 const ui = new dat.GUI()

 let preset = {}

 //Groups
 const group1 = new THREE.Group()
 scene.add(group1)
 const group2 = new THREE.Group()
 scene.add(group2)
 const group3 = new THREE.Group()
 scene.add(group3)

 const uiObj = 
 {
   sourceText: "Shadows of Power The neon lights of Nova City glowed faintly against the pitch-black night, a reflection of its people's weary spirits. The towering skyline of modern marvels cut sharp silhouettes into the horizon, but even the brilliant architecture couldn't mask the undercurrent of tension that rippled through the city's streets. As crime rates spiked and whispers of a sinister presence began to rise, only one figure stood between the city and chaos—Solace. Solace, the light-wielding superhero, patrolled the streets tirelessly, her black and gold suit shimmering faintly as she darted across the rooftops. Though her outward demeanor exuded confidence and strength, she felt the burden of her responsibility. Every time she saved someone, she wondered if she could have done more. Every small victory felt like a drop in an ocean of chaos. Her current target was a minor villain named Jester, known for his affinity for technology and his love for sowing pandemonium through his mischievous antics. Unlike other criminals, Jester wasn’t inherently evil, but his latest act—a swarm of robotic spiders terrorizing Nova City's citizens—had crossed a line. Chapter 1: The Chase With a sudden leap, Solace dove from the rooftop, landing gracefully in the alley where Jester was orchestrating his havoc. The mechanical spiders scattered as her radiant energy disrupted their circuits, leaving Jester standing alone, his face painted in a crooked grin. “Well, well, look who it is—Miss Beacon of Boredom!” Jester taunted, adjusting his brightly colored goggles. “Can’t you let a guy have some fun?” “Your idea of fun just made half the city panic,” Solace replied, her voice calm but firm. “You’re coming with me.” Jester clicked his tongue in mock disappointment. “And ruin my grand finale? I think not.” With a press of a button on his wristband, smoke engulfed the alley. Solace’s glowing suit cut through the haze, but by the time it cleared, Jester was gone. Chapter 2: Shadows Stirring The next few days were eerily quiet, but Solace knew better than to believe that peace had returned. Reports of strange blackouts, power surges, and unusual disappearances trickled in. People whispered about an ominous figure lurking in the darkness, a name spoken only in hushed tones: Umbra. Umbra had long been a ghost story in Nova City, a villain so feared that even the underworld refused to speak of him openly. His powers over darkness were said to rival the light Solace wielded. If the rumors were true, his return spelled disaster for Nova City. Chapter 3: The Confrontation Solace’s investigation led her to an abandoned power plant on the outskirts of the city. The air was thick with tension as she stepped inside, her suit glowing faintly to illuminate the pitch-black interior. The oppressive darkness seemed almost alive, coiling and shifting as if watching her every move. Then, a voice echoed through the void—deep, cold, and commanding. “Solace. The city’s shining star. How predictable.” Solace’s heart raced as the shadows coalesced into a towering figure. Umbra’s form was indistinct, a swirling mass of darkness with piercing white eyes. “What do you want, Umbra?” Solace demanded, her voice steady despite the dread gnawing at her. “Balance,” Umbra replied. “For too long, light has ruled this city. It’s time for darkness to reclaim its place.” Before she could respond, Umbra struck. Tendrils of shadow lashed out, forcing Solace to retaliate with beams of light. The battle that followed was a clash of opposites, light against dark, hope against despair. Solace’s energy illuminated the room in bursts, but Umbra’s shadows seemed endless, consuming the light and pressing in from all sides. Chapter 4: Enter the Wildcard As Solace struggled against Umbra’s overwhelming power, a sudden burst of sound and light disrupted the fight. Both combatants turned to see none other than Jester, his grin wider than ever. “Well, isn’t this cozy?” he quipped, holding up a small device. “Don’t mind me, just thought I’d drop by to even the odds.” Umbra’s voice rumbled with anger. “You dare interfere?” “Always,” Jester replied, pressing a button on the device. A pulse emanated from it, neutralizing both Solace’s light and Umbra’s shadows. The room was plunged into an unnatural twilight, leaving the three of them standing on equal footing. “Jester, what are you doing?” Solace asked, her frustration evident. “Saving the city, obviously,” he said, as though it were the most obvious thing in the world. “You two are so focused on your little battle of light and dark that you’re missing the bigger picture.” Chapter 5: An Uneasy Alliance Forced into a temporary truce, Solace and Jester worked together to uncover Umbra’s true plan. It wasn’t just about plunging Nova City into darkness—Umbra intended to use the power plant to create a field of perpetual shadow, cutting the city off from sunlight and electricity entirely. Jester, with his knack for technology, provided crucial insights into Umbra’s device. Though Solace was reluctant to trust him, she had no choice. Together, they devised a plan to infiltrate Umbra’s lair and disable the machine. Chapter 6: The Final Showdown The trio returned to the power plant, now fortified with Umbra’s shadow minions. Solace led the charge, her light cutting through the darkness as Jester disabled security systems and set traps to distract Umbra’s forces. Umbra himself awaited them in the control room, his presence radiating power. “You’re too late,” Umbra said, his voice filled with quiet menace. “The city’s fate is sealed.” “Not if I have anything to say about it,” Solace replied, her suit glowing brighter than ever. The battle that followed was unlike anything Nova City had ever seen. Solace and Umbra clashed with devastating force, their powers shaking the very foundations of the plant. Meanwhile, Jester worked frantically to disable the machine, his usual humor replaced with uncharacteristic focus. Chapter 7: Triumph and Reflection In the end, it was a combination of Solace’s power and Jester’s cunning that saved the city. Umbra, weakened and defeated, disappeared into the shadows, vowing to return. With the device destroyed, light returned to Nova City, and its citizens emerged from their homes to witness the dawn. For Solace, the victory was bittersweet. She had protected the city, but at great cost. The battle had taken a toll on her, both physically and emotionally. Still, she knew she couldn’t afford to rest—Nova City needed her. As for Jester, he vanished as quickly as he had appeared, leaving behind only a note that read: “Don’t forget to smile.” Despite her initial distrust, Solace couldn’t help but feel a grudging respect for the eccentric villain-turned-ally. Epilogue In the days that followed, Nova City began to heal. Solace returned to her role as its guardian, more determined than ever to protect its people. Umbra’s defeat was a reminder that even the darkest shadows could be overcome by the smallest spark of light. But somewhere in the city’s underground, whispers began to rise again. Umbra was gone, but his influence lingered, and new threats were already beginning to emerge. For Solace, the fight was far from over—but she was ready.",
   saveSourceText() {
      saveSourceText()
   },
   term1: {
    group: group1,
    term: 'umbra',
    color: '#ff0000',
    randomized: false,
    diameter: 10,
    scale: 0.25,
    nCubes: 20
   },
   term2: {
    group: group2,
    term: 'jester',
    color: '#d8f500',
    randomized: true,
    diameter: 35,
    scale: 0.5,
    nCubes: 5
   },
   term3: {
    group: group3,
    term: 'solace',
    color: '#00ff4c',
    randomized: false,
    diameter: 10,
    scale: 5,
    nCubes: 20
   },
   saveTerms() {
      saveTerms()
   },
   rotateCamera: false
 }

 //UI Functions
 const saveSourceText = () => 
 {
   //UI
   preset = ui.save()
   textFolder.hide()
   termsFolder.show()
   visualizeFolder.show()

   //Text Analysis 
   tokenizeSourceText(uiObj.sourceText)
 }

 const saveTerms = () => 
 {
   //UI
   preset = ui.save
   visualizeFolder.hide()
   cameraFolder.show()

   //Text Analysis
   findSearchTermInTokenizedText(uiObj.term1)
   findSearchTermInTokenizedText(uiObj.term2)
   findSearchTermInTokenizedText(uiObj.term3)
 }

 //Text folder
 const textFolder = ui.addFolder("Source Text")

 textFolder
   .add(uiObj, 'sourceText')
   .name("Source Text")

 textFolder
   .add(uiObj, 'saveSourceText')
   .name("Save")

 //Terms, Visualize, and Camera folder
 const termsFolder = ui.addFolder("Search Terms")
 const visualizeFolder = ui.addFolder("Visualize")
 const cameraFolder = ui.addFolder("Camera")

 termsFolder
   .add(uiObj.term1, 'term')
   .name("Term 1")

  termsFolder
   .add(group1, 'visible')
   .name("Term 1 Visibility")

 termsFolder
   .addColor(uiObj.term1, 'color')
   .name("Color for term 1")

 termsFolder
   .add(uiObj.term2, 'term')
   .name("Term 2")

  termsFolder
   .add(group2, 'visible')
   .name("Term 2 Visibility")

 termsFolder
   .addColor(uiObj.term2, 'color')
   .name("Color for term 2")

 termsFolder
   .add(uiObj.term3, 'term')
   .name("Term 3")

  termsFolder
   .add(group3, 'visible')
   .name("Term 3 Visibility")

 termsFolder
   .addColor(uiObj.term3, 'color')
   .name("Color for term 3")

 visualizeFolder
   .add(uiObj, 'saveTerms')
   .name("Visualize")

  cameraFolder
   .add(uiObj, 'rotateCamera')
   .name("Turntable")

 //Terms, Visualize, and Camera folders are hidden by default
 termsFolder.hide()
 visualizeFolder.hide()
 cameraFolder.hide()

/*********************
** TEXT ANALYSIS **
*********************/
 //Variables
 let parsedText, tokenizedText

 //Parse and Tokenize sourceText
 const tokenizeSourceText = (sourceText) =>
 {
   parsedText = sourceText.replaceAll(".", " ").toLowerCase()

   //Tokenize
   tokenizedText = parsedText.split(/[^\w']+/)
 }

 //find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) =>
  {  
      //for loop to go through the tokenizedText array
      for (let i = 0; i < tokenizedText.length; i++)
      {
          //if tokenizedText[i] matches our searchTerm, draw a cube
          if(tokenizedText[i] === params.term){
  
              //convert i into height, with a value between 0 and 20, so that visualization doesn't extend infinitely
              const height = (100 / tokenizedText.length) * i * 0.2
  
              //call drawCube function 100 times using converted height value
              for(let a = 0; a < params.nCubes; a++)
              {
                  if (params.term === "umbra") 
                  {
                      drawIsosahedron(height, params);
                  } 
                  else if (params.term === "solace") 
                  {
                      drawTorus(height, params);
                  } 
                  else if (params.term === "jester") 
                  {
                      drawSphere(height, params)
                  }
                  //drawCube(height, params)
              }   
      }
  }
  }
  const blowUpGroup = (group1, elapsedTime)  => {
    group1.children.forEach((object) => {
      const distance = Math.sin(elapsedTime * 1) * 5
      const direction = new THREE.Vector3(
        object.position.x,
        object.position.y,
        object.position.z
      ).normalize()
      //Apply group1 movement
      object.position.x += direction.x * distance * 1.5
      object.position.y += direction.y * distance * 1.5
      object.position.z += direction.z * distance * 1.5
    })



  }
/*********************
** Animation Loop **
*********************/
   const clock = new THREE.Clock()

   const animation = () => 
   {
      //Return elapsedTime
      const elapsedTime = clock.getElapsedTime()

      // Update OrbitControls
      controls.update()

      //change sphere color
      group2.children.forEach((sphere) => {
        const isPrimaryColor = Math.sin(elapsedTime * 1) > 0
        const color = isPrimaryColor? "#d8f500" : "#8700f5"
        sphere.material.color.set(color)
      
      })
      
      //bouncing torus
      group3.children.forEach((torusKnot) => {
        torusKnot.position.y = Math.sin(elapsedTime * 1) *5
        console.log(group3.children); // Should output an array of objects
      })
    

      //Rotate Camera
      if(uiObj.rotateCamera)
      {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 13
        camera.lookAt(-1, -3, -1)
      }
      //group1 blow up
      blowUpGroup(group1, elapsedTime)

      //Renderer
      renderer.render(scene, camera)

      //Request next frame
      window.requestAnimationFrame(animation)
   }

   animation()
   //finish assignment 2