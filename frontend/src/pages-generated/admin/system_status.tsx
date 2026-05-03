import React from 'react'
import { i18n } from '../../lib/i18n'

export default function SystemStatus(props: Record<string, unknown>) {
  return (<>
<dl className="admin-dl-horizontal" data-fetch-url={`/-/admin/system_status`} data-fetch-sync="$morph" data-fetch-trigger="every 5s">
	<dt>{i18n("admin.dashboard.server_uptime")}</dt>
	<dd><relative-time format="duration" datetime={String(props.sysStatus?.startTime ?? "")}>{props.sysStatus?.startTime as any}</relative-time></dd>
	<dt>{i18n("admin.dashboard.current_goroutine")}</dt>
	<dd>{props.sysStatus?.numGoroutine as any}</dd>
	<div className="divider"></div>
	<dt>{i18n("admin.dashboard.current_memory_usage")}</dt>
	<dd>{props.sysStatus?.memAllocated as any}</dd>
	<dt>{i18n("admin.dashboard.total_memory_allocated")}</dt>
	<dd>{props.sysStatus?.memTotal as any}</dd>
	<dt>{i18n("admin.dashboard.memory_obtained")}</dt>
	<dd>{props.sysStatus?.memSys as any}</dd>
	<dt>{i18n("admin.dashboard.pointer_lookup_times")}</dt>
	<dd>{props.sysStatus?.lookups as any}</dd>
	<dt>{i18n("admin.dashboard.memory_allocate_times")}</dt>
	<dd>{props.sysStatus?.memMallocs as any}</dd>
	<dt>{i18n("admin.dashboard.memory_free_times")}</dt>
	<dd>{props.sysStatus?.memFrees as any}</dd>
	<div className="divider"></div>
	<dt>{i18n("admin.dashboard.current_heap_usage")}</dt>
	<dd>{props.sysStatus?.heapAlloc as any}</dd>
	<dt>{i18n("admin.dashboard.heap_memory_obtained")}</dt>
	<dd>{props.sysStatus?.heapSys as any}</dd>
	<dt>{i18n("admin.dashboard.heap_memory_idle")}</dt>
	<dd>{props.sysStatus?.heapIdle as any}</dd>
	<dt>{i18n("admin.dashboard.heap_memory_in_use")}</dt>
	<dd>{props.sysStatus?.heapInuse as any}</dd>
	<dt>{i18n("admin.dashboard.heap_memory_released")}</dt>
	<dd>{props.sysStatus?.heapReleased as any}</dd>
	<dt>{i18n("admin.dashboard.heap_objects")}</dt>
	<dd>{props.sysStatus?.heapObjects as any}</dd>
	<div className="divider"></div>
	<dt>{i18n("admin.dashboard.bootstrap_stack_usage")}</dt>
	<dd>{props.sysStatus?.stackInuse as any}</dd>
	<dt>{i18n("admin.dashboard.stack_memory_obtained")}</dt>
	<dd>{props.sysStatus?.stackSys as any}</dd>
	<dt>{i18n("admin.dashboard.mspan_structures_usage")}</dt>
	<dd>{props.sysStatus?.mSpanInuse as any}</dd>
	<dt>{i18n("admin.dashboard.mspan_structures_obtained")}</dt>
	<dd>{props.sysStatus?.mSpanSys as any}</dd>
	<dt>{i18n("admin.dashboard.mcache_structures_usage")}</dt>
	<dd>{props.sysStatus?.mCacheInuse as any}</dd>
	<dt>{i18n("admin.dashboard.mcache_structures_obtained")}</dt>
	<dd>{props.sysStatus?.mCacheSys as any}</dd>
	<dt>{i18n("admin.dashboard.profiling_bucket_hash_table_obtained")}</dt>
	<dd>{props.sysStatus?.buckHashSys as any}</dd>
	<dt>{i18n("admin.dashboard.gc_metadata_obtained")}</dt>
	<dd>{props.sysStatus?.gCSys as any}</dd>
	<dt>{i18n("admin.dashboard.other_system_allocation_obtained")}</dt>
	<dd>{props.sysStatus?.otherSys as any}</dd>
	<div className="divider"></div>
	<dt>{i18n("admin.dashboard.next_gc_recycle")}</dt>
	<dd>{props.sysStatus?.nextGC as any}</dd>
	<dt>{i18n("admin.dashboard.last_gc_time")}</dt>
	<dd><relative-time format="duration" datetime={String(props.sysStatus?.lastGCTime ?? "")}>{props.sysStatus?.lastGCTime as any}</relative-time></dd>
	<dt>{i18n("admin.dashboard.total_gc_pause")}</dt>
	<dd>{props.sysStatus?.pauseTotalNs as any}</dd>
	<dt>{i18n("admin.dashboard.last_gc_pause")}</dt>
	<dd>{props.sysStatus?.pauseNs as any}</dd>
	<dt>{i18n("admin.dashboard.gc_times")}</dt>
	<dd>{props.sysStatus?.numGC as any}</dd>
</dl>

  </>)
}
