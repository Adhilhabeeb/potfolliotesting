import { usePhysics, usePhysicsObjects, userenderer, usescene } from "./Dancew";



function Loopenine() {
     const physics = usePhysics()

    const physicsObjects = usePhysicsObjects()
       physics.step()
    //    console.log(physicsObjects,"physicsobject")
    for (let i = 0; i < physicsObjects.length; i++) {
        const po = physicsObjects[i]
        const autoAnimate = po.autoAnimate
console.log(po,"pooooooo")
        if (autoAnimate) {
          const mesh = po.mesh
          const collider = po.collider
          mesh.position.copy(collider.translation() )
          mesh.quaternion.copy(collider.rotation())
        }

        const fn = po.fn
        fn && fn()
      }

}

export {Loopenine};