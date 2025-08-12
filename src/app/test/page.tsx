export default function TestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-8">
      <h1 className="text-4xl text-black dark:text-white mb-8">Color Test Page</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-voltage text-white">Voltage Color</div>
        <div className="p-4 bg-danger text-white">Danger Color</div>
        <div className="p-4 bg-acid text-black">Acid Color</div>
        <div className="p-4 bg-plasma text-white">Plasma Color</div>
        <div className="p-4 bg-pure text-black">Pure Color</div>
        <div className="p-4 bg-void text-white">Void Color</div>
        <div className="p-4 bg-steel text-white">Steel Color</div>
        <div className="p-4 bg-ghost text-black">Ghost Color</div>
      </div>
      
      <div className="mt-8 p-4 border-2 border-voltage">
        <p>If you can see this box with a blue border and the color blocks above, Tailwind is working.</p>
        <p className="text-voltage">This text should be blue (voltage color).</p>
      </div>
    </div>
  )
}
