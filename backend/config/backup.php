<?php
return ['retention_days'=>(int)env('BACKUP_RETENTION_DAYS',14),'disk'=>env('BACKUP_DISK','local')];
