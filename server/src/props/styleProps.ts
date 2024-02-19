"use client"

export default ['cols', 'gaps', 'grid', 'css']

export const styleProps: Proper = function(props: record, params: Params) {
   const classNameTag = globalTag(props, params)
   const newGridProps = gridProps(classNameTag, params)

   return newGridProps
} 

function gridProps(props: record, params: Params) {
   if (!props) return props

   const cssProps = ['cols', 'grid', 'gaps']
   const memberProps = Object.keys(props)
   const hasStyleProps = memberProps.some(x => cssProps.includes(x))

   if (!hasStyleProps) return props
   if (!props.style) props.style = { }

   if (props.cols) 
      props.style.gridTemplateColumns 
         = typeof props.cols == 'number'
         ? Array.range(props.cols).map(x => `1fr`).join(' ')
         : props.cols

   if (props.gaps)
      props.style.gaps 
         = typeof props.gaps == 'number'
         ? `${props.gaps}px`
         : props.gaps
         
   if (memberProps.includes('grid'))
      props.style.display = 'grid'

   cssProps.forEach(k => delete props[k])

   return props
}


function globalTag(props: record, params: Params) {
   if (props?.className?.includes(params.own) || false) return props

   const css = `${props.css || ''} ${props.className || ''}`
   const classNameTag = `${css} ${params.own || 'default'}`
   const className = classNameTag.trim().replace(/\d+$/, '')

   return { ...props, className }
}

