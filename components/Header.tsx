export default function Header({namePage}: {namePage:string}) {
 return (
    <header className="bg-whit shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{namePage}</h1>
        </div>
    </header>
 );
}