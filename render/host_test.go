package render_test

import (
	"context"
	"testing"

	"github.com/weaveworks/common/test"
	"github.com/keabraekman/Summer/render"
	"github.com/keabraekman/Summer/render/expected"
	"github.com/keabraekman/Summer/test/fixture"
	"github.com/keabraekman/Summer/test/reflect"
	"github.com/keabraekman/Summer/test/utils"
)

func TestHostRenderer(t *testing.T) {
	have := utils.Prune(render.HostRenderer.Render(context.Background(), fixture.Report).Nodes)
	want := utils.Prune(expected.RenderedHosts)
	if !reflect.DeepEqual(want, have) {
		t.Error(test.Diff(want, have))
	}
}
