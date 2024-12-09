<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $path = app_path("Services/{$name}.php");

        if (File::exists($path)) {
            $this->error("Service {$name} already exists!");
            return Command::FAILURE;
        }

        File::ensureDirectoryExists(app_path('Services'));

        File::put($path, $this->getStubContent($name));

        $this->info("Service {$name} created successfully.");
        return Command::SUCCESS;
    }

    protected function getStubContent($name)
    {
        return <<<PHP
        <?php

        namespace App\Services;

        class {$name} extends BaseService
        {
            public function __construct()
            {
                //
            }
        }
        PHP;
    }
}
