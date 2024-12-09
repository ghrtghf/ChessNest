<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository class';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $path = app_path("Repositories/{$name}.php");

        if (File::exists($path)) {
            $this->error("Repository {$name} already exists!");
            return Command::FAILURE;
        }

        File::ensureDirectoryExists(app_path('Repositories'));

        File::put($path, $this->getStubContent($name));

        $this->info("Repository {$name} created successfully.");
        return Command::SUCCESS;
    }

    protected function getStubContent($name)
    {
        return <<<PHP
        <?php

        namespace App\Repositories;

        class {$name} extends BaseRepository
        {
            public function __construct()
            {
                //
            }
        }
        PHP;
    }
}
